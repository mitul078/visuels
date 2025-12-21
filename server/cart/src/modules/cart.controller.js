const Cart = require("./cart.model")
const AppError = require("../middleware/AppError")
const { getProductById } = require("../service/product.service")


exports.add_cart = async (req, res, next) => {
    try {

        const { productId, quantity } = req.body
        const userId = req.user.id

        if (!productId || !quantity || quantity <= 0)
            return next(new AppError("invalid product or quantity", 400))

        const product = await getProductById(productId)

        if (!product) {
            return next(new AppError("Product not found", 404))
        }

        if (product.status !== "AVAILABLE")
            return next(new AppError("Product not available", 404))

        let cart = await Cart.findOne({ userId })

        const subtotal = product.price * quantity

        if (!cart) {
            cart = await Cart.create({
                userId,
                items: [
                    {
                        productId,
                        title: product.title,
                        image: product.image,
                        price: product.price,
                        quantity,
                        subtotal,
                        artistId: product.artistId
                    }
                ]
            })
        }

        else {

            const itemIdx = cart.items.findIndex(item => item.productId.toString() === productId)

            if (itemIdx > -1) {
                cart.items[itemIdx].quantity += quantity
                cart.items[itemIdx].subtotal = cart.items[itemIdx].quantity * product.price
            }
            else {
                cart.items.push({
                    productId,
                    artistId: product.artistId,
                    title: product.title,
                    image: product.image,
                    price: product.price,
                    quantity,
                    subtotal
                })
            }

            cart.status = "ACTIVE"

            await cart.save()

        }

        res.status(201).json({
            msg: "product added",
            cart
        })


    } catch (error) {
        next(error)
    }
}

exports.see_cart = async (req, res, next) => {
    try {

        const userId = req.user.id

        const products = await Cart.find({ userId }).select("items totalItems totalPrice")

        if (products.length === 0)
            return next(new AppError("cart empty"))

        res.status(200).json({
            msg: "fetch items",
            products
        })
    } catch (error) {
        next(error)

    }
}

exports.update_cart = async (req, res, next) => {
    try {

        const productId = req.params.id
        const userId = req.user.id

        const { quantity } = req.body

        if (!quantity || quantity <= 0)
            return next(new AppError("invalid quantity", 400))

        const cart = await Cart.findOne({ userId })

        if (!cart)
            return next(new AppError("cart not found", 404))

        const itemIdx = cart.items.findIndex(item => item.productId.toString() === productId)

        if (itemIdx === -1)
            return next(new AppError("product not found", 404))

        cart.items[itemIdx].quantity = quantity

        await cart.save()

        res.status(200).json({
            msg: "product updated",
            cart
        })

    } catch (error) {
        next(error)

    }
}

exports.clear_cart = async (req, res, next) => {
    try {

        const userId = req.user.id

        await Cart.updateOne({ userId }, { $set: { items: [], totalPrice: 0, status: "ABANDONED", totalItems: 0 } })

        res.status(200).json({
            msg: "Cart cleared"
        })

    } catch (error) {
        next(error)
    }
}