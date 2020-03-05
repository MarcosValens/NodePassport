const express = require('express');
const authRoutes = require('./routes/auth-routes');
const app = express();

// set up viw engine
app.set('view engine','ejs');

// set up routes
app.use('/auth',authRoutes);

// create home route
app.get('/',(req,res) =>{
    res.render('home')
});

app.listen(9999,() =>{
console.log('Listen port 9999')
});
