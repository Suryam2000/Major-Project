module.exports.index = function(req, res){
    return res.json(200, {
        message: "V2 List of Posts",
        posts: []
    });
};