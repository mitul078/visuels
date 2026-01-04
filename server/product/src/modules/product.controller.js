const Product = require("./product.model")
const Category = require("./category.model")
const AppError = require("../middlewares/AppError")
const imagekit = require("../config/imagekit")
const slugify = require("slugify")
const { get_artist_detail } = require("../services/auth.service")



//admin and artist
exports.add_product = async (req, res, next) => {
    try {

        const { title, shortDescription, price, category, material, frameInclude, handMade, artistNote, certified, story, width, height, depth, orientation, unit, description } = req.body


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

        const artistDetail = await get_artist_detail(userId, userId)

        const product = await Product.create({
            title,
            shortDescription,
            price,
            artistId: userId,
            images,
            category: categoryDoc._id,
            description,
            artistDetail: {
                name: artistDetail.name,
                username: artistDetail.username,
                email: artistDetail.email,
            },
            certified,
            material,
            productDimension: {
                width,
                height,
                depth,
                orientation,
                unit
            },
            frameInclude,
            handMade,
            artistNote,
            story
        })

        res.status(201).json({
            msg: "product created",
            product
        })

    } catch (error) {
        next(error)
    }
}


exports.see_products = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = 9
        const skip = (page - 1) * limit

        const { category, q } = req.query
        const filter = {}


        if (category) {
            const categoryDoc = await Category.findOne({ slug: category, isActive: true }).select("_id name")

            if (!categoryDoc) {
                return res.status(200).json({
                    products: [],
                    page,
                    hasMore: false
                })
            }
            filter.category = categoryDoc._id
        }

        if (q) {
            filter.$or = [
                { title: { $regex: q, $options: "i" } },
                { shortDescription: { $regex: q, $options: "i" } },
                { material: { $regex: q, $options: "i" } },
                { category: { $regex: q, $options: "i" } },
                { description: { $regex: q, $options: "i" } }
            ]
        }

        const products = await Product.find(filter)
            .select("title price shortDescription category isActive rating likes views images certified")
            .populate("category", "name")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean()

        const totalProduct = await Product.countDocuments(filter)
        const hasMore = skip + products.length < totalProduct


        return res.status(200).json({
            msg: "fetched products",
            page,
            limit,
            hasMore,
            products
        })


    } catch (error) {
        next(error)
    }
}

//productId
exports.product_by_id = async (req, res, next) => {
    try {

        const { id } = req.params
        const isInternal = req.path.includes("/internal")

        const product = await Product.findOne({ _id: id })

        if (!product)
            return next(new AppError("No product found", 404))

        if (isInternal) {
            return res.status(200).json({
                product: {
                    productId: product._id,
                    title: product.title,
                    price: product.price,
                    image: product.images[0].url,
                    status: product.status,
                    artistId: product.artistId
                }
            })
        }

        res.status(200).json({
            msg: "fetched product",
            product
        })

    } catch (error) {
        next(error)
    }
}

//productId
exports.update_product = async (req, res, next) => {
    try {

        const { id } = req.params
        const userId = req.authType === "USER" ? req.user.id : req.userId

        const product = await Product.findOne({ _id: id, artistId: userId })

        if (!product) {
            return next(new AppError("Product not found or unauthorized", 404))
        }

        const { price, title, shortDescription, width, height, depth, orientation, unit, material, category, description } = req.body

        if (title) product.title = title
        if (shortDescription) product.shortDescription = shortDescription

        if (description) product.description = description

        if (price !== undefined && product.price !== price) {
            product.price = price
        }

        if (width !== undefined || product.productDimension.width !== width) {
            product.productDimension.width = width
        }
        if (height !== undefined || product.productDimension.height !== height) {
            product.productDimension.height = height
        }
        if (depth !== undefined || product.productDimension.depth !== depth) {
            product.productDimension.depth = depth
        }

        const allowedOrientation = ["LANDSCAPE", "PORTRAIT", "SQUARE"]
        if (orientation) {
            if (!allowedOrientation.includes(orientation)) {
                return next(new AppError("Orientation must be LANDSCAPE, PORTRAIT OR SQUARE", 400))
            }
            product.productDimension.orientation = orientation
        }

        const allowedUnit = ["CM", "INCH"]
        if (unit) {
            if (!allowedUnit.includes(unit)) {
                return next(new AppError("Unit must be CM or INCH", 400))
            }
            product.productDimension.unit = unit
        }

        if (material) product.material = material

        if (category) {
            const slug = slugify(category, { lower: true });

            let categoryDoc = await Category.findOne({ slug });

            if (!categoryDoc) {
                categoryDoc = await Category.create({
                    name: category,
                    slug
                });
            }

            product.category = categoryDoc._id
        }

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

//productId
exports.delete_product = async (req, res, next) => {
    try {
        const { id } = req.params
        const userId = req.authType === "USER" ? req.user.id : req.userId

        const product = await Product.findOne({ _id: id, artistId: userId }).select("_id images")

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


        await Product.deleteOne({ _id: id })



        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })

    } catch (error) {
        next(error)
    }
}

//userId
exports.get_logged_artist_products = async (req, res, next) => {
    try {

        const userId = req.user.id
        const products = await Product.find({ artistId: userId })
            .select("title shortDescription isActive views likes status category images price createdAt updatedAt")
            .populate("category" , "name")

        if (products.length === 0)
            return res.status(200).json({ products: [] })

        res.status(200).json({
            msg: "fetched products",
            products
        })

    } catch (error) {
        next(error)
    }
}

exports.get_all_category = async (req, res, next) => {
    try {

        const allCategory = await Category.find({ isActive: true }).select("name")

        res.status(200).json({ allCategory })

    } catch (error) {
        next(error)
    }
}





