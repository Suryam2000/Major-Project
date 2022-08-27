const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use a new startegy for google login
passport.use(new googleStrategy({
        clientID: "243445071670-8p4sm70pg09a8je2l4qo40h3ha28n3je.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    },

    function(accessToken, refreshToken, profile, done){
        //find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){console.log(err); return;}

            if(user){
                //if found set this as req.user/sign in
                return done(null,user);
            }else{
                //if not found, create the user and set it as req.user/sign in
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){console.log(err); return;}

                    return done(null,user);
                });
            }
        });
    }
));

module.exports = passport;