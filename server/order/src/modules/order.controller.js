const { getProducts } = require("../services/cart.service")
const Order = require("./order.model")

exports.createOrder = async (req, res, next) => {
    try {

        const userId = req.authType === "USER" ? req.user.id  : req.userId

        const data  = await getProducts(userId)

        console.log(data)

        
    } catch (error) {
        next(error)
    }
}