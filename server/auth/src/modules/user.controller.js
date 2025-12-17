const { publishToQueue } = require("../broker/broker")
const { generate_otp } = require("../utils/otp")
const User = require("./user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const AppError = require("../utils/AppError")
const passport = require("passport")
const { Strategy: GoogleStrategy } = require("passport-google-oauth20")


exports.email_signup = async (req, res, next) => {
    try {

        const { email, username, name, password } = req.body

        const userExists = await User.findOne({
            $or: [{ email }, { username }]
        })

        if (userExists)
            return next(new AppError("User already exists", 400))



        const hashPass = await bcrypt.hash(password, 10)

        const otp = generate_otp()
        const hashOtp = await bcrypt.hash(otp, 10)

        const user = await User.create({
            email,
            otp: hashOtp,
            otpExpiresAt: Date.now() + 5 * 60 * 1000,
            authProvider: "EMAIL",
            username,
            name,
            password: hashPass
        })

        await publishToQueue("AUTH_SERVICE:EMAIL_OTP", {
            email: user.email,
            otp
        })

        res.status(201).json({
            status: true,
            msg: "otp sent",
            user: {
                email: user.email,
                username: user.username,
                name: user.name,
                role: user.role
            }
        })


    } catch (error) {
        next(error)
    }
}

exports.verify_email_otp = async (req, res, next) => {
    try {
        const { otp, email } = req.body

        const user = await User.findOne({ email })

        if (!user)
            return next(new AppError("User not found", 404))

        if (user.otpExpiresAt < Date.now())
            return next(new AppError("Otp expired", 400))

        const verifyOtp = await bcrypt.compare(otp, user.otp)
        if (!verifyOtp)
            return next(new AppError("Otp wrong", 400))

        user.isEmailVerified = true
        user.otp = undefined
        user.otpExpiresAt = undefined

        await user.save()

        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.cookie("token", token, {
            secure: true,
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            success: true,
            msg: "user verified",
            user: {
                username: user.username,
                email: user.email,
                role: user.role
            }
        })

    } catch (error) {
        next(error)
    }
}

exports.gmail_signin = async (req, res, next) => {
    try {

        const user = req.user

        user.isEmailVerified = true
        user.otp = undefined
        user.otpExpiresAt = undefined
        user.lastLogin = Date.now()

        await user.save()

        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            msg: "login successful",
            user: {
                username: user.username, 
                email : user.email,
                name: user.name,
                role: user.role
            }
        })

    } catch (error) {
        next(error)

    }
}



