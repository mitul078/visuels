const { getProduct } = require("../services/product.service")
const Order = require("./order.model")
const AppError = require("../utils/AppError")
const { me } = require("../services/auth.service")


//validation left
exports.create_order_cart = async (req, res, next) => {
    try {

        const userId = req.user.id

        const { requirement, quantity, productId } = req.body

        if (!productId)
            return next(new AppError("Product is required", 400))

        const product = await getProduct(productId, userId) //fetch product items
        const user = await me(userId) //user detail

        const orderItems = {
            productId: product?.productId,
            artistId: product?.artistId,
            title: product?.title,
            price: product?.price,
            quantity: quantity || product?.quantity,
            image: product?.image,

        }


        const order = await Order.create({
            userId,
            items: orderItems,
            contact: {
                email: user?.email,
                username: user?.username,
            },
            requirement
        })

        res.status(201).json({
            msg: "Order Created",
            order
        })

    } catch (error) {
        next(error)
    }
}

exports.get_artist_order = async (req, res, next) => {
    try {


        const artistId = req.user.id

        const order = await Order.find({ "items.artistId": artistId, status: { $in: ["REQUESTED", "VIEWED"] } }).select("items requirement status createdAt")

        if (order.length === 0) {
            return res.status(200).json({
                msg: "No orders yet",
                order: []
            })
        }

        return res.status(200).json({
            msg: "Order fetched",
            order,
            totalOrder: order.length
        })



    } catch (error) {
        next(error)
    }
}


//for user
exports.get_order_by_id = async (req, res, next) => {
    try {

        const userId = req.user.id
        const orderId = req.params.id

        const order = await Order.findOne({ _id: orderId, userId }).select("items status createdAt")

        if (!order) {
            return res.status(200).json({
                msg: "No orders yet"
            })
        }

        return res.status(200).json({
            msg: "Order fetched",
            order
        })

    } catch (error) {
        next(error)

    }
}


exports.get_my_orders = async (req, res, next) => {
    try {

        const userId = req.user.id

        const order = await Order.find({ userId }).select("items status createdAt")

        if (order.length === 0) {
            return res.status(200).json({
                msg: "No orders yet",
                orders: []
            })
        }

        return res.status(200).json({
            msg: "Orders fetched",
            order,
            totalOrder: order.length
        })

    } catch (error) {
        next(error)

    }
}


exports.update_order = async (req, res, next) => {
    try {

        const artistId = req.user.id
        const orderId = req.params.id
        const { status } = req.body

        const ALLOWED_STATUS = ["VIEWED", "ACCEPTED", "REJECTED"]

        if(!ALLOWED_STATUS.includes(status))
            return next(new AppError("invalid status" , 400))

        const order = await Order.findOne({ _id: orderId, "items.artistId": artistId })

        if (!order) {
            return res.status(404).json({
                msg: "Order not found"
            })
        }

        order.status = status

        await order.save()

        return res.status(200).json({
            msg: 'Order updated',
            orderId: order._id,
            status: order.status
        })


    } catch (error) {
        next(error)
    }
}



