const message = require("../models/messages");
const conversation = require("../models/conversation");

exports.addMessage = (req, res) => {
    const convId = req.body.convId;
    const userId = req.body.userId;
    const msg = req.body.msgBody;

    const Message = new message({
        conversationId: convId,
        body: msg,
        author: userId,
    });

    Message.save((err, msg) => {
        if (err) console.log(err);
        else {
            res.json(msg);
        }
    });
};

exports.getConversation = (req, res) => {
    const convId = req.body.convId;

    message.find({ conversationId: convId }, (err, data) => {
        if (err) console.log(err);
        else {
            res.json(data);
        }
    });
};
