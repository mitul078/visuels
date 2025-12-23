const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    artistId: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String, required: true },
    subtotal: { type: Number, min: 0 },
    commissionRate: { type: Number, default: 0.05 },
    commissionAmount: { type: Number, min: 0 },
    artistEarning: { type: Number, min: 0 }
}, { _id: false })

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true, index: true },
    items: { type: [itemSchema], required: true },
    totalAmount: { type: Number, min: 0 },
    totalCommission: { type: Number, min: 0 },
    status: { type: String, enum: ["PENDING", "PAID", "DELIVERED", "SHIPPED", "CANCEL", "REFUND"], default: "PENDING", index: true },
    payment: {
        paymentId: String,
        provider: String,
        paidAt: Date,
    },
    paymentMethod: { type: String, enum: ["UPI", "NETBANKING"], required: true },
    shippingAddress: {
        fullName: String,
        phone: String,
        address: String,
        city: String,
        pinCode: String,
        state: String,
        country: String
    },

    contact: {
        type: {
            email: { type: String, required: true },
            phone: { type: String, required: true },
            username: {type:String , required: true},
        },
        required: true
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


orderSchema.index({ userId: 1, createdAt: -1 })
orderSchema.index({ "items.artistId": 1 })
orderSchema.index({ status: 1, createdAt: -1 })


orderSchema.pre("save", function () {
    let totalAmount = 0
    let totalCommission = 0

    this.items.forEach((item) => {
        item.subtotal = item.price * item.quantity

        item.commissionAmount = item.subtotal * item.commissionRate
        item.artistEarning = item.subtotal - item.commissionAmount

        totalAmount += item.subtotal
        totalCommission += item.commissionAmount
    })

    this.totalAmount = totalAmount
    this.totalCommission = totalCommission

})


module.exports = mongoose.model("Order", orderSchema)