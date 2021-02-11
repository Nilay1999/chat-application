const mongoose = require('mongoose');
const user = require('../models/userSchema');
const bcrypt = require('bcryptjs');

exports.login = (req, res) => {

    const { email, password } = req.body;

    user.findOne({ email: email }, (err, data) => {
        if (err) {
            console.log(err)
        } else if (!data) {
            res.json('email')
        } else {
            bcrypt.compare(password, data.password, (err, match) => {
                if (err) {
                    console.log('Bcrypt Error');
                }
                if (!match) {
                    res.json('password')
                }
                if (match) {
                    res.json('success');
                }
            });
        }

    })
}