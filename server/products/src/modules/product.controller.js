const Product = require("./product.model")
const Category = require("./category.model")
const AppError = require("../middlewares/AppError")
const imagekit = require("../utils/imagekit")
const slugify = require("slugify")


//admin and artist
exports.add_product = async (req, res, next) => {
    try {

        const { title, description, price, category } = req.body

        const userId = req.user.id

        if (!req.files || req.files.length === 0) {
            return next(new AppError("At least one image is required", 400));
        }

        const allowedType = ["image/jpeg", "image/png", "image/jpg"]

        const upload = []


        for (const file of req.files) {
            if (!allowedType.includes(file.mimetype)) {
                return next(new AppError("Invalid image type", 400));
            }

            const uploaded = await imagekit.upload({
                file: file.buffer.toString("base64"),
                fileName: `${Date.now()}-${file.originalname}`,
                folder: "visuels/products"
            });

            upload.push(uploaded);
        }


        const images = upload.map((img, idx) => ({
            fileId: img.fileId,
            url: img.url,
            width: img.width,
            height: img.height,
            isPrimary: idx === 0
        }))

        const slug = slugify(category, { lower: true });

        let categoryDoc = await Category.findOne({ slug });

        if (!categoryDoc) {
            categoryDoc = await Category.create({
                name: category,
                slug
            });
        }

        const product = await Product.create({
            title,
            description,
            price,
            userId,
            images,
            category: categoryDoc._id
        })

        res.status(201).json({
            msg: "product created",
            product
        })

    } catch (error) {
        next(error)
    }
}


//globally display the products
exports.see_products = async (req, res, next) => {
    try {

        const products = await Product.find().populate("category" , "name")

        res.status(200).json({
            msg: "fetched products",
            products
        })


    } catch (error) {
        next(error)
    }
}

exports.products_by_id = async (req, res, next) => {
    try {

        const { id } = req.params

        const products = await Product.find({ _id: id })

        if (products.length === 0)
            return next(new AppError("No products found", 404))

        res.status(200).json({
            msg: "fetched products",
            products
        })

    } catch (error) {
        next(error)

    }
}

exports.update_product = async (req, res, next) => {
    try {

        const { id } = req.params
        const userId = req.user.id

        const product = await Product.findOne({ _id: id, userId })

        if (!product) {
            return next(new AppError("Product not found or unauthorized", 404))
        }

        const { price, title, description } = req.body

        if (title) product.title = title
        if (description) product.description = description
        if (price !== undefined) product.price = price

        await product.save()

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        })


    } catch (error) {
        next(error)

    }
}

exports.delete_product = async (req, res, next) => {
    try {
        const { id } = req.params
        const userId = req.user.id

        const product = await Product.findOne({ _id: id, userId })

        if (!product) {
            return next(new AppError("Product not found or unauthorized", 404))
        }


        if (product.images) {
            await Promise.all(
                product.images.map(img =>
                    imagekit.deleteFile(img.fileId)
                )
            )
        }


        await Product.deleteOne({_id: id})

        

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })

    } catch (error) {
        next(error)
    }
}


