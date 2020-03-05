const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();

// set up viw engine
app.set('view engine','ejs');

// connect to mongoDB
mongoose.connect(keys.mongoDB.dbURI, {useNewUrlParser: true, useUnifiedTopology: true},()  =>{
    console.log('Connected to DB')
});

// set up routes
app.use('/auth',authRoutes);

// create home route
app.get('/',(req,res) =>{
    res.render('home')
});

app.listen(9999,() =>{
console.log('Listen port 9999')
});
