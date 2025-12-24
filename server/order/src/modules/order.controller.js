const { getProduct } = require("../services/product.service")
const Order = require("./order.model")
const AppError = require("../utils/AppError")
const { me, get_artist_detail } = require("../services/auth.service")
const { publishToQueue } = require("../broker/broker")


//validation left
exports.create_order_cart = async (req, res, next) => {
    try {

        const userId = req.authType === "USER" ? req.user.id : req.userId

        const { requirement, quantity, productId } = req.body

        if (!productId)
            return next(new AppError("Product is required", 400))

        const product = await getProduct(productId, userId) //fetch product items
        const user = await me(userId) //user detail


        const orderItem = {
            productId: product?.productId,
            artistId: product?.artistId,
            title: product?.title,
            price: product?.price,
            quantity: quantity || product?.quantity,
            image: product?.image,
        }

        const existingOrderWithPid = await Order.findOne({ "item.productId": productId })

        if (existingOrderWithPid) {
            return res.status(200).json({
                msg: "Your order has already placed",
                order: {
                    item: existingOrderWithPid.item,
                    status: existingOrderWithPid.status,
                    amount: existingOrderWithPid.totalAmount
                }
            })
        }




        const order = await Order.create({
            userId,
            item: orderItem,
            contact: {
                email: user?.email,
                username: user?.username,
            },
            requirement
        })

        const artist = await get_artist_detail(order.item.artistId, userId)

        await publishToQueue("ORDER_DETAIL:ARTIST", {
            email: artist.email,
            username: artist.username,
            name: artist.name,
            customerDetail: order.contact,
            product: order.item,
            orderId: order._id
        })

        await publishToQueue("ORDER_DETAIL:USER", {
            customerDetail: {
                email: user?.email,
                name: user?.name
            },
            orderId: order._id,
            product: order.item,
            artistDetail: {
                email: artist.email,
                username: artist.username,
                name: artist.name
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

exports.get_artist_order = async (req, res, next) => {
    try {


        const artistId = req.user.id

        const order = await Order.find({ "item.artistId": artistId, status: { $in: ["REQUESTED", "VIEWED"] } }).select("item requirement status createdAt")

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

        const order = await Order.findOne({ _id: orderId, userId }).select("item status createdAt")

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

        const order = await Order.find({ userId }).select("item status createdAt")

        if (order.length === 0) {
            return res.status(200).json({
                msg: "No orders yet",
                orders: []
            })
        }

        res.status(200).json({
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

        if (!ALLOWED_STATUS.includes(status))
            return next(new AppError("invalid status", 400))

        const order = await Order.findOne({ _id: orderId, "item.artistId": artistId })

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


exports.cancel_order = async (req, res, next) => {
    try {

        const { id: orderId } = req.params
        const userId = req.user.id

        const order = await Order.findOneAndDelete({ _id: orderId, userId })
        if (!order)
            return next(new AppError("Order not found", 404))

        return res.status(200).json({
            msg: "Order cancel successfully",
        })


    } catch (error) {
        next(error)
    }
}


