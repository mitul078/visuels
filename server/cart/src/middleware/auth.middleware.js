const jwt = require("jsonwebtoken")
const AppError = require("./AppError")

exports.authMiddleware = async (req, res, next) => {
    try {

        const token = req.cookies.token
        if (!token)
            return next(new AppError("unauthorize", 400))

        const decode = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decode

        next()

    } catch (error) {
        next(error)
    }
}