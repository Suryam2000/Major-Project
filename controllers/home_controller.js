const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req, res){
    Post.find({})
    .populate('user')
    .populate({
        path: 'comment',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        if (err) return console.log(err);

        User.find({}, function(err, users){
            return res.render('home', {
                title: "Social | Home",
                posts: posts,
                all_users: users
            });
        });
    });
};