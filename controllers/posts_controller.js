const Posts = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

module.exports.createPost = async function(req, res){
    try {
        let post = await Posts.create({
            content: req.body.content,
            user: req.user._id
        }); 

        if(req.xhr){
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            post = await post.populate('user', 'name');

            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post Created!"
            });
        }

        req.flash('success', 'Posted Successfully');
    
        return res.redirect('back');
    } catch (error) {
        req.flash('error', error);
        // added this to view the error on console as well
        console.log(error);
        return res.redirect('back');
    }
};

module.exports.destroy = async function(req, res){
    try {
        let post = await Posts.findById(req.params.id).populate('comment');

        if(post.user == req.user.id){

            console.log(post.comment);
            //delteing a post deletes it likes and its associated comment's likes too
            await Like.deleteMany({likeable: post.comment, onModel: 'Comment'});
            await Like.deleteMany({likeable: post, onModel: 'Post'});

            post.remove();

            await Comment.deleteMany({post: req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post Deleted!"
                });
            }

            req.flash('success', 'Post Deleted!');

            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    } catch (error) {
        req.flash('error', error);
        return res.redirect('back');
    }
};
