const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){
    try {

        if(req.query.m == "session out"){
            req.flash('success', 'Logged out Successfully!');
        }

        let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comment',
            populate: {
                path: 'user'
            }
        });
    
        let users = await User.find({});
    
        return res.render('home', {
            title: "Social | Home",
            posts: posts,
            all_users: users
        });
    } catch (error) {
        return console.log(error);
    }
};