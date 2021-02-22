const user = require('../models/userSchema');

exports.profile = async(req, res) => {
    try {
        const _id = req.params._id;
        const getUser = await user.findOne({ id: _id });
        res.json(getUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

}