const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const router = express.Router();

const nodemailer = require('nodemailer');


const app = express();
app.use('/', router);

//Bodyparser Middlewart
app.use(express.json());

//DB config
const db = config.get("mongoURI");

//connect to mongo 
mongoose
    .connect(db, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('mongoDB connected...'))
    .catch(err => console.log(err));

//use Routes
app.use('/api/items', require('./routes/api/items'));
//app.use('/api/items/:id', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/send', require('./routes/nodemail'));
app.use('/chat', require('./routes/Chats'));

//Server static assest if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });

}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on ${port} .....`));
