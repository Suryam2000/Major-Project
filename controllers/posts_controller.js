const Posts = require('../models/post');
const Comment = require('../models/comment');

module.exports.createPost = function(req, res){
    Posts.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post){
        if(err){console.log('Error in creating a post!'); return; }

        return res.redirect('back');
    }); 
};

module.exports.destroy = function(req, res){
    Posts.findById(req.params.id, function(err, post){
        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post: req.params.id}, function(err){
                if(err){console.log(err); return;}

                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });
};
