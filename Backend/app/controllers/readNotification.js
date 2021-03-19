const Notification = require('../models/notification')

exports.readNotification = (req, res) => {
    var id = req.body.id;

    Notification.updateMany({ userId: id }, { "msg.$[].read": "true" }, (err, data) => {
        res.json(data)
    })
}