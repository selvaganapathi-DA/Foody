const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const mongoose = require ("mongoose");
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());
const uploadDir = path.join(__dirname, 'uploads');
app.use('/uploads', express.static('uploads'));

// Middleware for logging requests
const logMiddleware = (req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date()}`);
    next();
};

// Middleware for error handling
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
};

// Middleware for parsing JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply logging and error handling middleware
app.use(logMiddleware);
app.use(errorHandler);

const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'selvaganapathi.ait@gmail.com',
        pass: "hqbj pdho gdzz apjj"
    }
});

const fs = require('fs');
// Function to send email with attachments
async function sendMailWithAttachments() {
    try {
        // Read email template file
        const emailTemplate = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

        // Replace template variables
        const name = 'selvaganapthi'; // Replace with recipient's name
        const html = emailTemplate.replace('{{ name }}', name);

        // Define email options
        const mailOptions = {
            from: 'selvaganapathi.ait@gmail.com',
            to: 'selvamecsoft@gmail.com',
            subject: 'Sample Email with Attachments',
            html: html,
            attachments: [
                {
                    filename: 'document.pdf',
                    path: path.join(__dirname, 'attachments', 'document.pdf') // Replace with your file path
                },
                {
                    filename: 'image.jpg',
                    path: path.join(__dirname, 'attachments', 'image.jpg') // Replace with your file path
                }
            ]
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// Call the function to send email with attachments
sendMailWithAttachments();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // File upload destination
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // File name
    }
});

const upload = multer({ storage: storage });
// MongoDB connection
    mongoose.connect('mongodb+srv://selvaganapathiait:qDweGjuHDnpDZkjM@cluster0.mcclurf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('MongoDB connected successfully');
});
// Define schema and model
// Product schema and model
const productSchema = new mongoose.Schema({
    name: String,
    imageUrl: String,
    stock: Number
});
const Product = mongoose.model('Product', productSchema);

// Routes
// Create a product
// app.post('/products', async (req, res) => {
//     try {
//         const { name, imageUrl,stock,quantity } = req.body;
//         const imgpath = req.file ? `/uploads/${req.file.filename}`:imageUrl;
//         const newProduct = new Product({ name, imageUrl:imgpath, stock,quantity });
//         const savedProduct = await newProduct.save();
//         res.status(201).json(savedProduct);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to create product' });
//     }
// });
app.post('/products', upload.single('imageUrl'), async (req, res) => {
    try {
        const { name, stock } = req.body;
        const imageUrl = req.file.path; // Multer stores file path in req.file

        const newProduct = new Product({
            name,
            imageUrl,
            stock: parseInt(stock) // Ensure stock is parsed as an integer
        });

        await newProduct.save(); // Save product to MongoDB

        res.status(201).json({ message: 'Product uploaded successfully' });
    } catch (error) {
        console.error('Error uploading product:', error);
        res.status(500).json({ message: 'Upload failed' });
    }
});
// Read all products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Read a product by ID
app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

// Update a product by ID
app.put('/products/:id', async (req, res) => {
    try {
        const { name,  imageUrl, stock } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,
            { name, imageUrl, stock },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// Delete a product by ID
app.delete('/products/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
});
// // Multer configuration
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null,  uploadDir); // Destination folder for uploaded files
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// };

// const upload = multer({ 
//     storage: storage, 
//     fileFilter: fileFilter,
//     limits: {
//         fileSize: 1024 * 1024 * 5 // 5MB file size limit
//     }
// });

// File upload route
app.post('/upload', upload.single('image'), (req, res) => {
    try {
        return res.status(201).json({
            message: 'File uploaded successfully',
            file: req.file // This will contain information about the uploaded file
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'File upload failed'
        });
    }
});

//filter
// Filter products by name
app.get('/products/filter/name/:name', async (req, res) => {
    try {
        const regex = new RegExp(req.params.name, 'i'); // Case-insensitive search
        const filteredProducts = await Product.find({ name: regex });
        res.json(filteredProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to filter products by name' });
    }
});
// Filter products by created date range
app.get('/products/filter/created-date', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const products = await Product.find({
            createdAt: {
                $gte: new Date(startDate),
                $lt: new Date(endDate)
            }
        });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to filter products by created date' });
    }
});
// Filter products by stock availability
app.get('/products/filter/stock-available', async (req, res) => {
    try {
        const { inStock } = req.query;
        const products = await Product.find({ inStock: inStock === 'true' });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to filter products by stock availability' });
    }
});


app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
