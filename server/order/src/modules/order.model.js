const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    artistId: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String, required: true },
    subtotal: { type: Number, required: true }
}, { _id: false })

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true, index: true },
    items: { type: [itemSchema], required: true },
    totalAmount: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ["PENDING", "PAID", "DELIVERED", "SHIPPED", "CANCEL", "REFUND"], default: "PENDING", index: true },
    payment: {
        paymentId: String,
        provider: String,
        paidAt: Date
    },
    shippingAddress: {
        name: String,
        phone: Number,
        address: String,
        city: String,
        pincode: String,
        state: String,
    },

    cancelledAt: Date,
    cancelledBy: {
        type: String,
        enum: ["USER", "ADMIN"],
    },
    refund: {
        refundId: String,
        refundAt: Date,
        amount: Number
    }
}, { timestamps: true })


orderSchema.index({userId: 1, createdAt: -1})
orderSchema.index({"items.artistId": 1})
orderSchema.index({status: 1 , createdAt: -1})


module.exports = mongoose.model("Order" , orderSchema)