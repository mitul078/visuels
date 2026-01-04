const mongoose = require("mongoose")

const images = new mongoose.Schema({
    url: { type: String, required: true },
    fileId: { type: String, required: true },
    isPrimary: { type: Boolean, default: false },
}, { _id: false })


const productSchema = new mongoose.Schema({
    artistId: { type: String, required: true },
    artistDetail: {
        type: {
            name: String,
            email: String,
            username: String
        },
        required: true
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    shortDescription: { type: String, required: true, trim: true },
    material: { type: String, trim: true, required: true },
    price: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ["SOLD", "AVAILABLE"], default: "AVAILABLE" },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    images: [images],
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true, index: true },
    isActive: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    frameInclude: { type: Boolean, default: false },
    handMade: { type: Boolean, default: false },
    artistNote: { type: String },
    certified: { type: Boolean, default: false, required: true },
    story: { type: String, trim: true },
    productDimension: {
        type: {
            width: String,
            height: String,
            depth: String,
            orientation: { type: String, enum: ["LANDSCAPE", "PORTRAIT", "SQUARE"] },
            unit: { type: String, enum: ["CM", "INCH"], default: "CM" }
        },
        required: true
    }

}, { timestamps: true })



productSchema.index({ price: 1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ status: 1, isActive: 1 });



module.exports = mongoose.model("Product", productSchema)