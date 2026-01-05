const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, index: true, unique: true },

    firstName: { type: String, default: "Not prefer to say" },
    lastName: { type: String, default: "Not prefer to say" },

    phone: {
        type: String,
        maxLength: 10,
        match: [/^\d{10}$/, "Invalid phone number"],
        default: "Not prefer to say"
    },

    dateOfBirth: { type: Date },

    address: { type: String },

    city: { type: String, default: "Not prefer to say" },
    state: { type: String, default: "Not prefer to say" },
    country: { type: String, default: "Not prefer to say" },
    pinCode: { type: String, default: "Not prefer to say" },

    avatar: { type: String, default: "" },

    isProfileCompleted: { type: Boolean, default: false },
    isMobileVerified: { type: Boolean, default: false }

}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)
