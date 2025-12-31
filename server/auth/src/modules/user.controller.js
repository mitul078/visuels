const { publishToQueue } = require("../broker/broker")
const { generate_otp } = require("../utils/otp")
const User = require("./user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const AppError = require("../utils/AppError")
const mongoose = require("mongoose")



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


        const isProd = process.env.NODE_ENV === "production"
        res.cookie("token", token, {
            secure: isProd,
            httpOnly: true,
            sameSite: isProd ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        await publishToQueue("AUTH_SERVICE:USER_CREATED", {
            username: user.username,
            email: user.email,
            role: user.role,
            name: user.name
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

exports.email_signin = async (req, res, next) => {
    try {

        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user)
            return next(new AppError("User not found", 404))

        const checkPass = await bcrypt.compare(password, user.password)

        if (!checkPass)
            return next(new AppError("password invalid", 400))


        if (user.isEmailVerified === false)
            return next(new AppError("User is not verified", 400))

        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: "7d" })

        const isProd = process.env.NODE_ENV === "production"
        res.cookie("token", token, {
            secure: isProd,
            httpOnly: true,
            sameSite: isProd ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })



        res.status(200).json({
            msg: "login success",
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
        const user = req.user;

        if (!user) {
            return res.redirect(
                `${process.env.FRONTEND_URL}/signin?oauthError=authentication_failed`
            );
        }

        user.isEmailVerified = true;
        user.otp = undefined;
        user.otpExpiresAt = undefined;
        user.lastLogin = Date.now();

        await user.save();

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        const isProd = process.env.NODE_ENV === "production";

        res.cookie("token", token, {
            secure: isProd,
            httpOnly: true,
            sameSite: isProd ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // Determine redirect based on action (signin or signup)
        const state = req.query?.state || "signin";
        const redirectPath = state === "signup" ? "/signup" : "/";
        
        res.redirect(`${process.env.FRONTEND_URL}${redirectPath}`);

    } catch (error) {
        console.error("Google OAuth error:", error);
        const state = req.query?.state || "signin";
        const redirectPath = state === "signup" ? "/signup" : "/signin";
        res.redirect(
            `${process.env.FRONTEND_URL}${redirectPath}?oauthError=server_error`
        );
    }
};



exports.me = async (req, res, next) => {
    try {

        const userId = req.authType === "USER" ? req.user.id : req.userId

        if (!userId)
            return next(new AppError("Login please", 400))

        const user = await User.findOne({ _id: userId })

        if (!user)
            return next(new AppError("User not found", 404))

        res.status(200).json({
            user: {
                email: user.email,
                username: user.username,
            }
        })

    } catch (error) {
        next(error)
    }
}

//to send info about the artist when order create
exports.artist_by_id = async (req, res, next) => {
    try {

        const { id: artistId } = req.params

        const user = await User.findOne({ _id: artistId, role: "ARTIST" })

        if (!user)
            return next(new AppError("User not found", 404))

        res.status(200).json({
            user: {
                email: user.email,
                username: user.username,
                name: user.name
            }
        })

    } catch (error) {
        next(error)
    }
}


exports.check_user_exists = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                valid: false,
                msg: "Invalid ID format"
            });
        }

        const exists = await User.exists({ _id: id });


        if (!exists) {
            return res.status(404).json({
                valid: false,
                msg: "User not found"
            });
        }

        return res.status(200).json({
            valid: true,
            msg: "User exists"
        });

    } catch (error) {
        next(error);
    }
};
