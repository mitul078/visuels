const jwt = require("jsonwebtoken")

let SERVICE_TOKEN = null

const generateServiceToken = () => {
    return jwt.sign(
        { service: "ORDER_SERVICE" }, process.env.SERVICE_JWT_SECRET, { expiresIn: "1h" }
    )
}

const isExpired = (token) => {
    const decoded = jwt.decode(token)
    return decoded.exp * 1000 < Date.now()
}

const getServiceToken = () => {
    if (!SERVICE_TOKEN || isExpired(SERVICE_TOKEN)) {
        SERVICE_TOKEN = generateServiceToken()
    }
    return SERVICE_TOKEN
}

module.exports = { getServiceToken }
