const AppError = require("./AppError")

exports.checkRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new AppError("Access denied", 400))
        }
        next()
    }
}