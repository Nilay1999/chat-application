const user = require('../models/userSchema');

exports.test = async(req, res) => {
    try {
        const deleteUser = await user.findByIdAndDelete(req.user);
        res.json(deleteUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}