const Conversation = require('../models/conversation');
const Message = require('../models/messages')

exports.createConv = (req, res) => {
    userId = req.body.id;
    receiverId = req.param.id;

    Conversation.findOne({ participants: [userId, receiverId] }, (err, conversation1) => {
        if (err)
            return res.send(err)
        if (conversation1 != null) {
            return res.status(422).send("Conversation Already Exist");
        } else {
            Conversation.findOne({ participants: [receiverId, userId] }, (err, conversation2) => {
                if (err)
                    return res.send(err)
                if (conversation2 != null) {
                    return res.status(422).send("Conversation Already Exist");
                } else {
                    const conv = new Conversation({
                        participants: [userId, receiverId]
                    })

                    conv.save((err, msg) => {
                        if (err) {
                            res.send(err)
                        } else {
                            res.json({ msg })
                        }
                    })
                }
            })
        }
    })
}