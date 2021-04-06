const user = require("../models/userSchema");
const post = require("../models/postSchema");

exports.makePost = (req, res) => {
    const id = req.body.id;
    const desc = req.body.desc;
    const img = req.file.path;
    var name;

    user.findOne({ _id: id }, (err, user) => {
        name = user.userName;
        const Post = new post({
            author: name,
            image: img,
            description: desc,
        });
        Post.save((err, data) => {
            res.json({ msg: "Successfully Posted" });
        });
    });
};

exports.viewPosts = (req, res) => {
    post.find({}, (err, posts) => {
        res.json(posts);
    });
};

exports.addLike = (req, res) => {
    const id = req.body.id;

    post.findOneAndUpdate({ _id: id }, { $inc: { likes: 1 } }, (err, post) => {
        if (err) throw err;
        res.json(post);
    });
};

exports.dislike = (req, res) => {
    const id = req.body.id;

    post.findOneAndUpdate(
        { _id: id },
        { $inc: { dislikes: 1 } },
        (err, post) => {
            if (err) throw err;
            res.json(post);
        }
    );
};
