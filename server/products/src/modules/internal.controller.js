const AppError = require("../middlewares/AppError")
const Product = require("./product.model")


exports.get_product_by_id = async (req, res, next) => {
    try {

        const productId = req.params.id

        const product = await Product.findOne({ _id: productId })

        if (!product)
            return next(new AppError("product not found", 404))

        res.status(200).json({
            product: {
                productId: product._id,
                title: product.title,
                price: product.price,
                image: product.images[0].url,
                status: product.status,
                artistId: product.userId
            }
        })

    } catch (error) {
        next(error)

    }
}