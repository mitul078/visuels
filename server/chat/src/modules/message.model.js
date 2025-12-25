const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    artistId: { type: String, required: true },
    content: { type: String, required: true },
    type: { type: String, enum: ["TEXT", "PDF", "IMAGE"], required: true }
}, { timestamps: true })

module.exports = mongoose.model("Message", messageSchema)