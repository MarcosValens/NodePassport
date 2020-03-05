const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

// set up viw engine
app.set('view engine', 'ejs');

// set up cookie-session
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, //1 day
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongoDB
mongoose.connect(keys.mongoDB.dbURI, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('Connected to DB')
});

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// create home route
app.get('/', (req, res) => {
    res.render('home', {user: res.user})
});

app.listen(9999, () => {
    console.log('Listen port 9999')
});
