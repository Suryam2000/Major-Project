const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');

module.exports.create = async function(req, res){
    try {
        let post = await Post.findById(req.body.post);

        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
    
            post.comment.push(comment);
            post.save();

            // Similar for comments to fetch the user's id!
            comment = await comment.populate('user', 'name email');
            comment = await comment.populate('post', 'user');
            let post2 = await post.populate('user', 'name email');

            //creating job for queue for sending emails using parallel jobs feature
            let job = queue.create('emails', {comment: comment, post2: post2}).save(function(err){
                if(err){ console.log(err); return; }
            });

            if (req.xhr){

                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Comment created!"
                });
            }
    
            res.redirect('/');
        }
    } catch (error) {
        req.flash('error', error);
        return;
    }
};

module.exports.destroy = async function(req, res){
    try {
        let comment = await Comment.findById(req.params.id);

        if((comment.user == req.user.id) || (req.params.pid == req.user.id) ){
            let postId = comment.post;

            comment.remove();

            let post = Post.findByIdAndUpdate(postId, {$pull: {comment: req.params.id}});
            
            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id,
                        post_user_id: req.params.pid
                    },
                    message: "Comment deleted"
                });
            }
            
            req.flash('success', 'Comment Deleted!');
            return res.redirect('back');
        }else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    } catch (error) {
        req.flash('error', error);
        return;
    }
};