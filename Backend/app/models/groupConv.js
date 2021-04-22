const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupConvSchema = new Schema({
    groupName: {
        type: String,
    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const groupConv = mongoose.model("groupConv", groupConvSchema);
module.exports = groupConv;
