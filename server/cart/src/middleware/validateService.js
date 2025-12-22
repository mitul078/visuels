const jwt = require("jsonwebtoken")
const AppError = require("../utils/AppError")

exports.validService = (allowedService = []) => {
    return (req, res, next) => {
        try {

            const token = req.headers.authorization.split(" ")[1]

            if (!token) {
                return next(new AppError("service token missing", 401))
            }


            const decode = jwt.verify(token, process.env.SERVICE_JWT_SECRET)

            if (!decode.service)
                return next(new AppError("invalid service", 401))

            if (allowedService.length && !allowedService.includes(decode.service)) {
                return next(new AppError("service not allowed", 403))
            }


            const userId = req.headers["x-user-id"]

            if (!userId)
                return next(new AppError("x-user-id missing", 400))

            req.authType = "SERVICE"
            req.service = decode.service
            req.userId = userId

            next()

        } catch (error) {
            next(error)
        }
    }
}