const Post = require('../models/post');

module.exports.home = function(req, res){
    Post.find({}).populate('user').exec(function(err, posts){
        if (err) return console.log(err);

        return res.render('home', {
            title: "Social | Home",
            posts: posts
        });
    });
};