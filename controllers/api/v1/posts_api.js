const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
const { post } = require('../../../routes');

module.exports.index = async function(req, res){

    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comment',
            populate: {
                path: 'user'
            }
        });

    return res.json(200, {
        message: "List of posts",
        posts: posts
    });
};

module.exports.destroy = async function(req, res){
    try {

        let post = await Post.findById(req.params.id);
        
        if(post.user == req.user.id){

            post.remove();

            await Comment.deleteMany({post: req.params.id});


            return res.json(200, {
                message: "Post is deleted Successfully!"
            });
        }else{
            return res.json(401, {
                message: "You cannot delete this post, Unauthorized User!"
            });
        }

    } catch (error) {
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
};