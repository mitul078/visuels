const jwt = require("jsonwebtoken")
const AppError = require("./AppError")

exports.validService = (allowedService = []) => {
    return (req, res, next) => {
        try {

            const header = req.headers.authorization

            if(!header || !header.startsWith("Bearer ")){
                return next(new AppError("service token missing" , 401))
            }

            const token = header.split(" ")[1]


            const decode = jwt.verify(token, process.env.SERVICE_JWT_SECRET)

            if (!decode.service)
                return next(new AppError("invalid service", 401))

            if (allowedService.length && !allowedService.includes(decode.service)) {
                return next(new AppError("service not allowed" , 403))
            }

            req.service = decode.service

            next()

        } catch (error) {
            next(error)
        }
    }
}