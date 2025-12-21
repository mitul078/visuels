const AppError = require("./AppError")

exports.checkRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError("Access denied", 400))
        }

        // User has required role, continue to next middleware/controller
        next()
    }
}