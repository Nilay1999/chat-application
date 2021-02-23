const user = require('../models/userSchema');

exports.home = async(req, res) => {
    try {
        const id = req.user;
        const getUser = await user.find({ _id: { $ne: id } });
        res.json(getUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}