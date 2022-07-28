const User = require('../models/user'); 
const { use } = require('../routes');

module.exports.user_profile = function(req, res){
    return res.render('user_profile',{
        title: "User | Profile"
    });
};

module.exports.signIn = function(req, res){
    return res.render('user_signin', {
        title: "User | SignIn"
    });
};

module.exports.signUp = function(req, res){
    return res.render('user_signup', {
        title: "User | SignUp"
    });
};

module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        console.error('Password does not match!!');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('Error in finding user in sign up!'); return}

        if(!user){
            User.create(req.body, function(err, user){
                if(err){console.log('Error in creating a new user!'); return}

                console.error('New User Created!!');
                return res.redirect('/users/sign-in');
            });
        }else{
            console.error('Account already exist with this email!');
            return res.redirect('back');
        }
    });
};

module.exports.createSession = function(req, res){
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('Error in finding user in signing in!'); return}

        if(user){
            if(user.password != req.body.password){
                console.error('Wrong Password');
                return res.redirect('back');
            }

            console.log(`Successfully Signed in: ${user.name}`);
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }else{
            console.error('No account created with this email');
            return res.redirect('back');
        }
    });
};