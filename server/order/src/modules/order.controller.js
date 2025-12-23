const { getProducts } = require("../services/cart.service")
const Order = require("./order.model")
const AppError = require("../utils/AppError")
const { me } = require("../services/auth.service")

exports.createOrder = async (req, res, next) => {
    try {

        const userId = req.authType === "USER" ? req.user.id : req.userId

        const { fullName, phone, city, state, country, paymentMethod, address , pinCode } = req.body


        const cart = await getProducts(userId) //fetch cart items
        const user = await me(userId) //user detail

        const orderItems = cart.map((item) => ({
            productId: item?.productId,
            artistId: item?.artistId,
            title: item?.title,
            price: item?.price,
            quantity: item?.quantity,
            image: item?.image,

        }))

        const order = await Order.create({
            userId,
            items: orderItems,
            paymentMethod,
            shippingAddress: {
                fullName,
                city,
                country,
                state,
                pinCode,
                address,
                phone
            },
            contact: {
                email: user?.email,
                username: user?.username,
                phone
            }
        })

        res.status(201).json({
            msg: "Order Created",
            order
        })

    } catch (error) {
        next(error)
    }
}