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
    const receiver = req.body.receiverId;

    message.find({ conversationId: convId }, (err, data) => {
        if (convId == null) {
            res.json({ msg: "Choose" });
        } else {
            // message.updateMany({ $set: { status: 3 } }).where({author:receiver , status : 1});
            res.json(data);
        }
    });
};

exports.loadLastMessage = (req, res) => {
    const convId = req.body.convId;

    message
        .findOne({ conversationId: convId })
        .sort({ createdAt: -1 })
        .exec((err, data) => {
            if (convId == null) {
                res.json({ msg: "Choose" });
            } else {
                res.json(data);
            }
        });
};

exports.markAsRead = (req, res) => {
    const receiver = req.body.id;

    message.updateMany(
        { author: receiver },
        { $set: { status: 3 } },
        (err, data) => {
            res.json(data);
        }
    );
};
