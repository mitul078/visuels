
const errorHandler = async (err, req, res, next) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({
        status: false,
        message: err.message || "internal server error"
    })
}

module.exports = errorHandler