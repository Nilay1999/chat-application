const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    participants: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const Conversation = mongoose.model('conversation', ConversationSchema);
module.exports = Conversation;