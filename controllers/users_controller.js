const User = require('../models/user'); 

module.exports.user_profile = function(req, res){

    User.findById(req.params.uid, function(err, user){
        if(err){ 
            return console.log(err); 
        }
        return res.render('user_profile',{
            title: "Social | Profile",
            user_profile: user
        });
    });

};

module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, {name: req.body.name, email: req.body.email}, function(err, user){
            if(err){console.log(err); return;}
    
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
};

module.exports.signIn = function(req, res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_signin', {
        title: "Social | SignIn"
    });
};

module.exports.signUp = function(req, res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_signup', {
        title: "Social | SignUp"
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
    return res.redirect('/');
};

module.exports.destroySession = function(req, res){
    req.logout(function(err){
        if(err){ 
            return console.log(err); 
        }
    });
    return res.redirect('/');
};