const mongoose = require("mongoose")

const artistSchema = new mongoose.Schema({
    artistId: { type: String, required: true, index: true },
    bio: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    joinDate: {
        type: Date,
        default: Date.now
    },
    about: { type: String, required: true },

    specialist: [String],
    stylesAndThemes: [String],
    languages: [String],

    avatar: { type: String, required: true },
    banner: { type: String, required: true }
})

module.exports = mongoose.model("Artist", artistSchema)