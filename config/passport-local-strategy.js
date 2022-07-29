const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//Finding which user has signed in

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

//serializing user to decide which key to be used in cookies

passport.serializeUser(function(user, done){
    done(null, user.id);
});

//deserialize the key in cookie

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding the user!!');
            done(err);
        }

        done(null, user);
    });
});

//exporting

module.exports = passport;