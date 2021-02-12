const user = require('../models/userSchema');
const bcrypt = require('bcryptjs');

exports.register = (req, res) => {

    var { email, password, userName, firstName, lastName, phone } = req.body;
    var img = req.file.path;

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