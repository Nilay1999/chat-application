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

exports.groupConversation = (req, res) => {
    const admin = req.body.id;
    const groupName = req.body.grpName;

    if (groupName == null) {
        res.json({ msg: "Please enter group Name" });
    } else {
        groupConv({
            admin: admin,
            groupName: groupName,
        }).save((err, group) => {
            res.json({ msg: "Group Created", groupId: group._id });
        });
    }
};

exports.addToGroup = (req, res) => {
    const member = req.body.member;
    const groupId = req.body.groupId;

    groupConv.findOneAndUpdate(
        { _id: groupId },
        {
            $push: {
                participants: member,
            },
        },
        (err, group) => {
            if (err) console.log(err);
            else res.json({ msg: "Added to Group" });
        }
    );
};

exports.getGroupData = (req, res) => {
    var user = req.body.id;
    groupConv.find({ participants: req.body.id }, (err, groupData) => {
        if (err) console.log(err);
        else res.json(groupData);
    });
};
