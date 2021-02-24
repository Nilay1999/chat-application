const User = require('../models/userSchema');

exports.addFriend = (req, res) => {
    const senderId = req.body._id;
    User.findByIdAndUpdate(req.params.id, {
        $push: {
            friend: [{
                sender: senderId,
                pendingRequest: true
            }]
        },
    }, function(err, data) {
        if (err) {
            console.log(err)
        } else {
            res.json({ msg: "Friend Request Send" });
        }
    })
}