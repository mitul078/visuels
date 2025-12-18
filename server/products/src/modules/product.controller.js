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

