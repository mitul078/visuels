const jwt = require("jsonwebtoken")
const AppError = require("../utils/AppError")

exports.authMiddleware = async (req, res, next) => {
    try {

        const token = req.cookies.token

        if(!token)
            return next(new AppError("unauthorize" , 403))

        const decode = jwt.verify(token , process.env.JWT_SECRET)

        req.user = decode
        req.authType = "USER"
        
    } catch (error) {
        next(error)
    }
}