const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true
    },
    senderId: {
        type: String,
        required: true
    },
    senderRole: {
        type: String,
        enum: ["USER", "ARTIST"],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["TEXT", "PDF", "IMAGE"],
        required: true
    }
}, { timestamps: true })


module.exports = mongoose.model("Message", messageSchema)