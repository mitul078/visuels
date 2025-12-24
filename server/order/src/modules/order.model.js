const mongoose = require("mongoose")


const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    item: {
        type: {
            productId: { type: String, required: true },
            artistId: { type: String, required: true },
            title: { type: String, required: true, trim: true },
            price: { type: Number, required: true, min: 0 },
            quantity: { type: Number, required: true, min: 1, default: 1 },
            image: { type: String, required: true },
            subtotal: { type: Number, min: 0 },
        },
        required: true
    },
    totalAmount: { type: Number, min: 0 },
    status: { type: String, enum: ["REQUESTED", "VIEWED", "ACCEPTED", "REJECTED", "CANCEL"], default: "REQUESTED", index: true },

    requirement: {
        type: String,
        default: ""
    },

    contact: {
        type: {
            email: { type: String, required: true },
            username: { type: String, required: true },
        },
        required: true
    },

}, { timestamps: true })


orderSchema.index({ userId: 1, "item.productId": 1 }, { unique: true })
orderSchema.index({ status: 1, createdAt: -1 })


orderSchema.pre("save", function () {
    this.item.subtotal = this.item.price * this.item.quantity
    this.totalAmount = this.item.subtotal
})


module.exports = mongoose.model("Order", orderSchema)