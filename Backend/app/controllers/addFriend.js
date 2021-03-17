const User = require('../models/userSchema');

exports.addFriend = (req, res) => {
    const senderId = req.body._id;
    const email = req.body.email;

    let senderName;
    User.findById(senderId, (err, data) => {
        senderName = data.userName
    })


    User.findOne({ _id: req.params.id, 'friend.sender': senderId }, (err, data) => {
        if (err) {
            console.log(err)
        } else if (data) {
            res.json({ msg: 'Friend Request Already Sent' })
        } else {
            User.findByIdAndUpdate(req.params.id, {
                $push: {
                    friend: [{
                        sender: senderId,
                        senderEmail: email
                    }],
                    notification: [{
                        msg: `${senderName} sent you a friend request`
                    }]
                }
            }, (err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    res.json({ msg: 'Friend Request Sent' })
                }
            })

        }
    })
}