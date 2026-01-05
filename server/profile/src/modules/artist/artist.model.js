const mongoose = require("mongoose")

const artistSchema = new mongoose.Schema({
    artistId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    bio: { type: String },
    city: { type: String },
    state: { type: String },

    joinDate: {
        type: Date,
        default: Date.now
    },

    about: { type: String },

    specialist: [String],
    stylesAndThemes: [String],
    languages: [String],

    avatar: {
        url: { type: String },
        fileId: { type: String }
    },
    banner: {
        url: { type: String },
        fileId: { type: String }
    },


    isProfileCompleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

module.exports = mongoose.model("Artist", artistSchema)
