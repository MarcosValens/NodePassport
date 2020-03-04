const express = require('express');
const authRoutes = require('./routes/auth-routes')
const app = express();

// set up viw engine
app.set('view engine','ejs');

// set up routes
app.use('/auth',authRoutes);

// create home route
app.get('/',(req,res) =>{
    res.render('home')
});

app.listen(3000,() =>{
console.log('Listen port 3000')
});