const Conversation = require("../models/conversation");
const groupConv = require("../models/groupConv");
const Message = require("../models/messages");
const User = require("../models/userSchema");

exports.createConv = (req, res) => {
    userId = req.body.id;
    receiverId = req.params.id;
    var userName;
    Conversation.findOne(
        { participants: [userId, receiverId] },
        (err, conversation1) => {
            if (conversation1 != null) {
                User.findOne({ _id: receiverId }, (err, user) => {
                    res.json({
                        id: conversation1._id,
                        userName: user.userName,
                    });
                });
            } else {
                Conversation.findOne(
                    { participants: [receiverId, userId] },
                    (err, conversation2) => {
                        if (err) return res.send(err);
                        if (conversation2 != null) {
                            User.findOne({ _id: receiverId }, (err, user) => {
                                res.json({
                                    id: conversation2._id,
                                    userName: user.userName,
                                });
                            });
                        } else {
                            const conv = new Conversation({
                                participants: [userId, receiverId],
                            });
                            User.findOne({ _id: receiverId }, (err, user) => {
                                userName = user.userName;
                            });
                            conv.save((err, msg) => {
                                if (err) {
                                    res.send(err);
                                } else {
                                    res.json({
                                        id: msg._id,
                                        userName: userName,
                                    });
                                }
                            });
                        }
                    }
                );
            }
        }
    );
};
