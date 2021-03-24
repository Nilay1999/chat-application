const Conversation = require('../models/conversation');
const Message = require('../models/messages')

exports.createConv = (req, res) => {
    userId = req.body.id;
    receiverId = req.params.id;

    Conversation.findOne({ participants: [userId, receiverId] }, (err, conversation1) => {
        if (err)
            return res.send(err)
        if (conversation1 != null) {
            res.json({ id: conversation1._id })
        } else {
            Conversation.findOne({ participants: [receiverId, userId] }, (err, conversation2) => {
                if (err)
                    return res.send(err)
                if (conversation2 != null) {
                    res.json({ id: conversation2._id })
                } else {
                    const conv = new Conversation({
                        participants: [userId, receiverId]
                    })
                    conv.save((err, msg) => {
                        if (err) {
                            res.send(err)
                        } else {
                            res.json({ id: msg._id })
                        }
                    })
                }
            })
        }
    })
}