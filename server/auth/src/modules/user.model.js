const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    username: { type: String, required: true, unique: true, sparse: true },
    email: { type: String, unique: true, trim: true, sparse: true },
    name: { type: String, required: true, trim: true },
    password: { type: String },
    googleId: { type: String },
    status: { type: String, enum: ["ACTIVE", "BLOCKED"], default: "ACTIVE" },
    role: { type: String, enum: ["USER", "ARTIST", "ADMIN"], default: "USER" },
    isEmailVerified: { type: Boolean, default: false },
    authProvider: { type: String, enum: ["EMAIL", "GOOGLE"], required: true },
    lastLogin: Date,
    otp: { type: String },
    otpExpiresAt: {type:Date , index: {expires: 0}},


}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)