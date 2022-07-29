const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email, password, done){
        User.findOne({email: email}, function(err, user){
            if(err){
                console.log('Error in finding user!!');
                return done(err);
            }

            if(!user || user.password != password){
                console.log('Inavlid Username/Password');
                return done(null, false);
            }

            return done(null, user);
        });
    }
));