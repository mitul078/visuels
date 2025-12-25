const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({

    participants: [{ type: String }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }]

}, { timestamps: true })

module.exports = mongoose.model("Chat", chatSchema)