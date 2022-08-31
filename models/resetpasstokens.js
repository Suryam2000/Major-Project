const mongoose = require('mongoose');

const resetpasstokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    accesstoken: {
        type: String,
        required: true
    },
    isValid: {
        type: String
    }
},{
    timestamps: true
});

const resetToken = mongoose.model('resetToken', resetpasstokenSchema);

module.exports = resetToken;