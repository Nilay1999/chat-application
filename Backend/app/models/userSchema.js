const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        minlength: 3
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    friend: [{
        sender: {
            type: mongoose.Schema.Types.ObjectId,
        },
        senderEmail: {
            type: String
        },
        pendingRequest: {
            type: Boolean,
        }
    }],
    friendList: [{
        friendId: {
            type: mongoose.Schema.Types.ObjectId
        }
    }],
    notification: [{
        msg: {
            type: String
        }
    }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;