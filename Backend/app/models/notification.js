const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notification = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    msg: [{
        body: {
            type: String,
        },
        created_At: {
            type: Date,
            default: Date.now
        }
    }]
})

const Notification = mongoose.model('notification', notification);
module.exports = Notification;