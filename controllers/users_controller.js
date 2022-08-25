const User = require('../models/user'); 
const fs = require('fs');
const path = require('path');

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

module.exports.update = async function(req, res){
    if(req.user.id == req.params.id){

        try {
            
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log(err);
                }

                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    //saving the path of uploaded file into avatar field in user schema
                    //user.avatar = User.avatarPath + '/' + req.file.filename;

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }

                user.save();
                return res.redirect('back');
            });

        } catch (error) {
            req.flash('error', error);
            return res.redirect('back');
        }
    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
};

module.exports.signIn = function(req, res){

    if(req.isAuthenticated()){
        req.flash('warning', 'Session ongoing!');
        return res.redirect('/');
    }

    return res.render('user_signin', {
        title: "Social | SignIn"
    });
};

module.exports.signUp = function(req, res){

    if(req.isAuthenticated()){
        req.flash('warning', 'Session ongoing!');
        return res.redirect('/');
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
    req.flash('success', 'Logged in Successfully');

    return res.redirect('/');
};

module.exports.destroySession = function(req, res){
    req.logout(function(err){
        if(err){ 
            return console.log(err); 
        }
    });
    
    return res.redirect('/?m=' + "session out");

};