const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//Finding which user has signed in

passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
    function(req, email, password, done){
        User.findOne({email: email}, function(err, user){
            if(err){
                req.flash('error', err);
                return done(err);
            }

            if(!user || user.password != password){
                req.flash('error', 'Inavlid Username/Password');
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
            req.flash('error', err);
            done(err);
        }

        done(null, user);
    });
});

//check authentication
passport.checkAuthentication = function(req, res, next){
    //if signed in
    if(req.isAuthenticated()){
        return next();
    }

    //if not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }

    next();
}

//exporting

module.exports = passport;