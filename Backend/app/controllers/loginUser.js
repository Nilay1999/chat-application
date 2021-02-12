const user = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {

    const { email, password } = req.body;

    user.findOne({ email: email }, (err, data) => {
        if (err) {
            console.log(err)
        } else if (!data) {
            res.json({ msg: 'email' })
        } else {
            bcrypt.compare(password, data.password, (err, match) => {
                if (err) {
                    console.log('Bcrypt Error');
                }
                if (!match) {
                    res.json({ msg: 'password' })
                }
                if (match) {
                    const token = jwt.sign({ id: data._id }, process.env.JWT_SECRET);
                    res.json({
                        token,
                        user: {
                            id: data._id,
                            email: data.email
                        }
                    });
                }
            });
        }

    })
}