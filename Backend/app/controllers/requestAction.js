const User = require('../models/userSchema');

exports.action = (req, res) => {
    User.findOne({ _id: req.body._id, 'friend.pendingRequest': true }, (err, data) => {
        res.json(data.friend);
    })

}