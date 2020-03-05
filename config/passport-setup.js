const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../model/user-model');

passport.serializeUser((user,done) =>{
    done(null, user.id)
});

passport.deserializeUser(async (id,done) =>{
    let receivedUser = await User.findById(id);
    done(null, receivedUser)
});

passport.use(new GoogleStrategy({
        //options for strategy
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, async (accesToken, refreshToken, profile, done) => {
        // passport callback function
        // check if user already exists in our db
        let currentUser = await User.findOne({
            googleId: profile.id
        });
        if (currentUser) {
            // already have the user
            done(null, currentUser)
        } else {
            //if not, create user in our db
            let newUser = await new User({
                username: profile.displayName,
                googleId: profile.id,
                thumbnail:profile._json.picture,
            }).save();
            done(null, newUser)
        }
    })
);
