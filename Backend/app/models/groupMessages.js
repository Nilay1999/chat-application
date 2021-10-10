const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupMessageSchema = new Schema(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "groupConv",
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        readBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);
var groupMsg = mongoose.model("groupMessage", groupMessageSchema);
module.exports = groupMsg;
