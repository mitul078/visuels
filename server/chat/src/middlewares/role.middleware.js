const AppError = require("../utils/AppError")

exports.checkRole = (...roles) => {
    return (req, res, next) => {

        if (!req.user)
            return next(new AppError("Authentication required", 401))

        if (!req.user.role) {
            return next(new AppError("User role not found", 403))
        }

        if (!roles.includes(req.user.role)) {
            return next(new AppError(`Access denied. Required roles: ${roles.join(", ")}. Your role: ${req.user.role}`, 403))
        }

        next()
    }
}