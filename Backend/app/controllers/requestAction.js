const User = require("../models/userSchema");
const Notification = require("../models/notification");

exports.pendingRequest = (req, res) => {
    User.findOne({ _id: req.body._id }, (err, data) => {
        if (data.friend[0] == null) {
            res.json({ msg: "No Pending Requests" });
        } else {
            res.json(data.friend);
        }
    });
};

exports.acceptRequest = (req, res) => {
    var senderId = req.body.userId;
    var friendId = req.params.id;

    User.findById(senderId, (err, data) => {
        senderName = data.userName;
    });

    User.findOne(
        { _id: senderId, "friendList.friendId": friendId },
        (err, data) => {
            if (err) {
                res.json(err);
            } else if (data) {
                res.json({ msg: "Friend Request Already Accepted" });
            } else {
                User.findByIdAndUpdate(
                    senderId,
                    {
                        $push: {
                            friendList: [
                                {
                                    friendId: friendId,
                                },
                            ],
                        },
                    },
                    (err, list) => {
                        if (err) {
                            console.log(err);
                        } else {
                            User.findByIdAndUpdate(
                                senderId,
                                {
                                    $pull: {
                                        friend: { sender: friendId },
                                    },
                                },
                                (err, success) => {
                                    res.json(success);
                                }
                            );
                        }
                    }
                );
            }
        }
    );

    User.findOne(
        { _id: friendId, "friendList.friendId": senderId },
        (err, data) => {
            if (err) {
                res.json(err);
            } else if (data) {
                res.json({ msg: "Friend Request Already Accepted" });
            } else {
                User.findByIdAndUpdate(
                    friendId,
                    {
                        $push: {
                            friendList: [
                                {
                                    friendId: senderId,
                                },
                            ],
                            notification: [
                                {
                                    msg: `${senderName} Accepted Your request`,
                                },
                            ],
                        },
                    },
                    (err, list) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("success");
                        }
                    }
                );
            }
        }
    );

    Notification.findOne({ userId: friendId }, (err, data) => {
        if (data) {
            Notification.findOneAndUpdate(
                { userId: friendId },
                {
                    $push: {
                        msg: [
                            {
                                body: `${senderName} Accepted Your request`,
                            },
                        ],
                    },
                },
                (err, user) => {
                    console.log("notification push");
                }
            );
        } else {
            const newNotification = new Notification({
                userId: friendId,
                msg: [
                    {
                        body: `${senderName} Accepted Your request`,
                    },
                ],
            });
            newNotification.save((err, data) => {
                if (err) throw err;
            });
        }
    });
};

exports.rejectRequest = (req, res) => {
    const senderId = req.body.userId;
    const friendId = req.params.id;

    User.findOne({ _id: senderId }, (err, data) => {
        if (err) {
            res.json(err);
        } else {
            User.findByIdAndUpdate(
                senderId,
                {
                    $pull: {
                        friend: { sender: friendId },
                    },
                },
                (err, success) => {
                    res.json(data);
                }
            );
        }
    });
};

exports.friendList = (req, res) => {
    User.findOne({ _id: req.body.userId }, (err, userData) => {
        var id = [];
        userData.friendList.forEach((element) => {
            id.push(element.friendId);
        });

        User.find({ _id: id }, (err, data) => {
            res.json(data);
        });
    });
};
