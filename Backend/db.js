const mongoose = require('mongoose')

const url = 'mongodb+srv://selvaganapathiait:qDweGjuHDnpDZkjM@cluster0.mcclurf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })
