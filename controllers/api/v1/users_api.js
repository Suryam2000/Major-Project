const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req, res){
    try {

        let user = await User.findOne({email: req.body.email}); 

        if(!user || user.password != req.body.password){
            return res.json(422, {
                message: "Invalid username or password"
            });
        }

        return res.json(200, {
            message: "Sign in successfull! Token Generated.",
            data: {
                token: jwt.sign(user.toJSON(), 'Suryam', {expiresIn: '100000'})
            }
        });

    } catch (error) {
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
};