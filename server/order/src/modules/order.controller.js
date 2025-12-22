const { getProducts } = require("../services/cart.service")
const Order = require("./order.model")
const AppError = require("../utils/AppError")

exports.createOrder = async (req, res, next) => {
    try {

        const userId = req.authType === "USER" ? req.user.id : req.userId

        const {fullName , phone , city , state , country , paymentMethod , address} = req.body
        

        const cartItems = await getProducts(userId)

        if (!cartItems || cartItems.length === 0)
            return next(new AppError("cart empty", 400))

        const orderItems = cartItems.map((item) => ({
            productId: item.productId,
            artistId: item.artistId,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            image: item.image,

        }))

        const order = await Order.create({
            userId,
            items:orderItems,

        })


    } catch (error) {
        next(error)
    }
}