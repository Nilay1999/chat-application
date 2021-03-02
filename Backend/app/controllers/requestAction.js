const User = require('../models/userSchema');

exports.pendingRequest = (req, res) => {
    User.findOne({ _id: req.body._id, 'friend.pendingRequest': true }, (err, data) => {
        if (!data) {
            res.json({ msg: "No Pending Requests" })
        } else {
            res.json(data.friend);
        }
    })
}

exports.acceptRequest = (req, res) => {
    const senderId = req.body.userId;
    const friendId = req.params.id;

    User.findOne({ _id: senderId, 'friendList.friendId': friendId }, (err, data) => {
        if (err) {
            res.json(err)
        } else if (data) {
            res.json({ msg: "Friend Request Already Accepted" })
        } else {
            User.findByIdAndUpdate(senderId, {
                $push: {
                    friendList: [{
                        friendId: friendId
                    }]
                }
            }, (err, list) => {
                if (err) {
                    console.log(err)
                } else {
                    User.findByIdAndUpdate(senderId, {
                        $pull: {
                            "friend": { "sender": friendId }
                        }
                    }, (err, success) => {
                        res.json(success)
                    })
                }
            })
        }
    })

    User.findOne({ _id: friendId, 'friendList.friendId': senderId }, (err, data) => {
        if (err) {
            res.json(err)
        } else if (data) {
            res.json({ msg: "Friend Request Already Accepted" })
        } else {
            User.findByIdAndUpdate(friendId, {
                $push: {
                    friendList: [{
                        friendId: senderId
                    }]
                }
            }, (err, list) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(list)
                }
            })
        }
    })
}

exports.rejectRequest = (req, res) => {
    const senderId = req.body.userId;
    const friendId = req.params.id;

    User.findOne({ _id: senderId }, (err, data) => {
        if (err) {
            res.json(err)
        } else {
            User.findByIdAndUpdate(senderId, {
                $pull: {
                    "friend": { "sender": friendId }
                }
            }, (err, success) => {
                res.json(success)
            })
        }
    })
}

exports.friendList = (req, res) => {
    User.findOne({ _id: req.body.userId }, (err, userData) => {
        var id = []
        userData.friendList.forEach(element => {
            id.push(element.friendId)
        })

        User.find({ _id: id }, (err, data) => {
            res.json(data)
        })
    })
}