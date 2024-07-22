// const express = require('express');
// const jwt = require('jsonwebtoken');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcryptjs');
// const cors = require('cors');
// const multer = require('multer');
// const path = require('path');
// const app = express();
// const port = 5001;

// app.use(bodyParser.json());
// app.use(cors());

// const users = []; // This should be replaced with a proper database

// const secretKey = 'your-secret-key';



// // Register route
// app.post('/register', async (req, res) => {
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     users.push({ username, password: hashedPassword });
//     console.log('User registered:', username);
//     res.sendStatus(201);
// });

// // Login route
// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     const user = users.find(u => u.username === username);
//     if (user) {
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (isPasswordValid) {
//             const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
//             res.json({ token });
//         } else {
//             console.log('Invalid password for user:', username);
//             res.status(401).json({ message: 'Invalid credentials' });
//         }
//     } else {
//         console.log('User not found:', username);
//         res.status(401).json({ message: 'Invalid credentials' });
//     }
// });





// app.listen(port, () => {
//     console.log(`Server running on ${port}`);
// });


const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const users = [];

const JWT_SECRET = 'your_jwt_secret';

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  try {
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Incorrect password' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = { id: users.length + 1, username, password: hashedPassword, email };
    users.push(newUser);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/verifyToken', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Token verification failed:', err);
      return res.status(401).json({ error: 'Token verification failed' });
    }
    res.status(200).json({ message: 'Token verified successfully' });
  });
});

app.listen(5001, () => {
  console.log('Server is running on http://localhost:5001');
});
