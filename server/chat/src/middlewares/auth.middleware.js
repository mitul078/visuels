const jwt = require("jsonwebtoken")
const AppError = require("../utils/AppError")

exports.authMiddleware = async (req, res, next) => {
    try {

        if (!process.env.JWT_SECRET) {
            return next(new AppError("JWT_SECRET not configured", 500))
        }

        const token = req.cookies.token
        if (!token)
            return next(new AppError("unauthorize", 401))

        const decode = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decode
        req.authType = "USER"

        next()

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return next(new AppError("Invalid token", 403))
        }
        if (error.name === 'TokenExpiredError') {
            return next(new AppError("Token expired", 403))
        }
        next(error)
    }
}