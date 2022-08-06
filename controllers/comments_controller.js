const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    Post.findById(req.body.post, function(err, post){
        if(err){console.log(err); return;}
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            },function(err, comment){
                if(err){console.log(err); return;}
                post.comment.push(comment);
                post.save();

                res.redirect('/');
            });
        }
    });
};

module.exports.destroy = function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        if(err){console.log(err); return;}

        if((comment.user == req.user.id) || (req.params.pid == req.user.id) ){
            comment.remove();

            let postId = comment.post;

            Post.findByIdAndUpdate(postId, {$pull: {comment: req.params.id}}, function(err, post){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });
};