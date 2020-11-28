const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 5569;
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/rest', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
},err => {
    if(err) throw err
    console.log('databaseConection');
} );

const authControler = require('./routes/auth');
app.use('/auth', authControler);

app.listen(port);