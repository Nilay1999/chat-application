const User = require('../models/userSchema');
const Notification = require('../models/notification');

exports.addFriend = (req, res) => {
    const senderId = req.body._id;
    const email = req.body.email;
    const receiver = req.params.id;

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
            User.findOne({ _id: req.params.id, 'friendList.friendId': senderId }, (err, data) => {
                if (data) {
                    res.json({ msg: 'Already In Friend List' })
                } else {
                    User.findByIdAndUpdate(req.params.id, {
                        $push: {
                            friend: [{
                                sender: senderId,
                                senderEmail: email
                            }]
                        }
                    }, (err, data) => {
                        if (err) {
                            console.log(err)
                        } else {
                            res.json({ msg: 'Friend Request Sent' })
                        }
                    })


                    Notification.findOne({ userId: receiver }, (err, data) => {
                        if (data) {
                            Notification.findOneAndUpdate({ userId: receiver }, {
                                $push: {
                                    msg: [{
                                        body: `${senderName} sent you a friend request`
                                    }]
                                }
                            }, (err, user) => {
                                console.log('notification push')
                            })
                        } else {
                            const newNotification = new Notification({
                                userId: receiver,
                                msg: [{
                                    body: `${senderName} sent you a friend request`
                                }]
                            })
                            newNotification.save((err, data) => {
                                if (err)
                                    throw err;
                            })
                        }
                    })
                }
            })

            // User.findByIdAndUpdate(req.params.id, {
            //     $push: {
            //         friend: [{
            //             sender: senderId,
            //             senderEmail: email
            //         }]
            //     }
            // }, (err, data) => {
            //     if (err) {
            //         console.log(err)
            //     } else {
            //         res.json({ msg: 'Friend Request Sent' })
            //     }
            // })


            // Notification.findOne({ userId: receiver }, (err, data) => {
            //     if (data) {
            //         Notification.findOneAndUpdate({ userId: receiver }, {
            //             $push: {
            //                 msg: [{
            //                     body: `${senderName} sent you a friend request`
            //                 }]
            //             }
            //         }, (err, user) => {
            //             console.log('notification push')
            //         })
            //     } else {
            //         const newNotification = new Notification({
            //             userId: receiver,
            //             msg: [{
            //                 body: `${senderName} sent you a friend request`
            //             }]
            //         })
            //         newNotification.save((err, data) => {
            //             if (err)
            //                 throw err;
            //         })
            //     }
            // })
        }
    })
}