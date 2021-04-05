const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  image: {
    type: String,
    require: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    require: true,
  },
});

const post = mongoose.model("Post", postSchema);
module.exports = post;
