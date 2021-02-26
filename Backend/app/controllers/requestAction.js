const User = require('../models/userSchema');

exports.pendingRequest = (req, res) => {
    User.findOne({ _id: req.body._id, 'friend.pendingRequest': true }, (err, data) => {
        if (!data) {
            res.send("No Pending Requests")
        } else {
            res.json(data.friend);
        }
    })
}

exports.acceptRequest = (req, res) => {
    const userId = req.body.userId;
    const senderId = req.params.id;
    User.findByIdAndUpdate(senderId, {
        $push: {
            friendList: [{
                friendId: userId
            }]
        },
    }, (err, data) => {
        if (data) {
            res.json(data)
        }
    })
}