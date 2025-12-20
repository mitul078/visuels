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
                    }
                ]
            })
        }

        else{

            const itemIdx = cart.items.findIndex(item => item.productId.toString() === productId)

            if(itemIdx > -1){
                cart.items[itemIdx].quantity += quantity
                cart.items[itemIdx].subtotal = cart.items[itemIdx].quantity * product.price
            }
            else{
                cart.items.push({
                    productId,
                    title:product.title,
                    image:product.image,
                    price:product.price,
                    quantity,
                    subtotal
                })
            }

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