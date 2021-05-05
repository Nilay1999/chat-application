const groupConv = require("../models/groupConv");
const groupMessage = require("../models/groupMessages");

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
    const user = req.body.id;
    groupConv.find(
        { $or: [{ participants: user }, { admin: user }] },
        (err, groupData) => {
            if (err) console.log(err);
            else res.json(groupData);
        }
    );
};

exports.addGroupMessage = (req, res) => {
    const { userId, groupId, msg } = req.body;
    const groupMsg = new groupMessage({
        conversationId: groupId,
        body: msg,
        author: userId,
    });
    groupMsg.save((err, msg) => {
        if (err) {
            console.log(err);
        } else {
            res.json(msg);
        }
    });
};
