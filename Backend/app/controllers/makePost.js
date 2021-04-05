const user = require("../models/userSchema");
const post = require("../models/postSchema");

exports.makePost = (req, res) => {
    const id = req.body.id;
    const desc = req.body.desc;
    const img = req.file.path;

    const Post = new post({
        author: id,
        image: img,
        description: desc,
    });

    Post.save((err, data) => {
        res.json({ msg: "Successfully Posted" });
    });
};
