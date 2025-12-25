const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({

    participants: [{ type: String }],
    lastMessage: { type: String },
    lastMessageAt: Date

}, { timestamps: true })

chatSchema.index({ participants: 1 }, { unique: true })


module.exports = mongoose.model("Chat", chatSchema)