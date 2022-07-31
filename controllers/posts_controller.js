const Posts = require('../models/post');

module.exports.createPost = function(req, res){
    Posts.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post){
        if(err){console.log('Error in creating a post!'); return; }

        return res.redirect('back');
    }); 
};
