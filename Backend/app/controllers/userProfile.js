const user = require("../models/userSchema");

exports.profile = async (req, res) => {
    try {
        const id = req.params.id;
        const getUser = await user.findById(req.params.id);
        res.json(getUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
