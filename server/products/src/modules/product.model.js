const mongoose = require("mongoose")

const images = new mongoose.Schema({
    url: { type: String, required: true },
    fileId: { type: String, required: true },
    width: Number,
    height: Number,
    isPrimary: { type: Boolean, default: false }
}, { _id: false })


const productSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ["SOLD", "AVAILABLE"], default: "AVAILABLE" },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    images: [{type: [images] , required: true}],
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true, index: true },
    isActive: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 }

}, { timestamps: true })



productSchema.index({ price: 1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ status: 1, isActive: 1 });

module.exports = mongoose.model("Product", productSchema)