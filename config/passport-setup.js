const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');

passport.use(new GoogleStrategy({
        //options for strategy
        callbackURL:'/auth/google/redirect',
        clientID:keys.google.clientID,
        clientSecret:keys.google.clientSecret
    }, (accesToken, refreshToken, profile, done) => {
        // passport callback function
        console.log('passport callbacn function fired')
        console.log(profile)
    })
);
