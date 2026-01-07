const mongoose = require("mongoose")

const artistSchema = new mongoose.Schema({
    artistId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    artist: {
        type: {
            name: String,
            username: String,
            email: String
        }
    },

    followers: { type: Number, min: 0, default: 0 },
    totalArtworks: { type: String },
    bio: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    overallRating: { type: String },

    joiningDate: { type: Date },

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
