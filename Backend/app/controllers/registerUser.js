const user = require('../models/userSchema');
const bcrypt = require('bcryptjs');
var base64ToImage = require('base64-to-image');

exports.register = (req, res) => {

    var { email, password, userName, firstName, lastName, phone } = req.body;
    var base64Str = req.body.img;
    var path = './app/uploads/';

    base64ToImage(base64Str, path);
    var imageInfo = base64ToImage(base64Str, path);
    var img = imageInfo.fileName;

    user.findOne({ email: email }, function(err, data) {
        if (data) {
            res.json({ msg: 'user' })
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    throw err
                }
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                        throw err
                    }
                    password = hash;
                    user({
                        email,
                        userName,
                        password,
                        firstName,
                        lastName,
                        phone,
                        img
                    }).save((err, data) => {
                        if (err)
                            console.log(err)
                        else
                            res.send(data)
                    })
                })
            })
        }
    });
}