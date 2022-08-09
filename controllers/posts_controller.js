const Posts = require('../models/post');
const Comment = require('../models/comment');

module.exports.createPost = async function(req, res){
    try {
        let post = await Posts.create({
            content: req.body.content,
            user: req.user._id
        }); 

        if(req.xhr){
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
        return console.log(error);
    }
};

module.exports.destroy = async function(req, res){
    try {
        let post = await Posts.findById(req.params.id);

        if(post.user == req.user.id){
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
        return console.log(error);
    }
};
