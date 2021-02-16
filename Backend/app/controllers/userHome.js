const user = require('../models/userSchema');

exports.home = async(req, res) => {
    try {
        const _id = req.user;
        const getUser = await user.findOne({ '_id': _id });
        res.json(getUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}