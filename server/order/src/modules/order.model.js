const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    artistId: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1, default: 1},
    image: { type: String, required: true },
    subtotal: { type: Number, min: 0 }
}, { _id: false })

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true, index: true },
    items: { type: [itemSchema], required: true },
    totalAmount: { type: Number, min: 0 },
    status: { type: String, enum: ["REQUESTED", "VIEWED", "ACCEPTED", "REJECTED", "CANCEL"], default: "REQUESTED", index: true },

    requirement: {
        type:String,
        default: ""
    },

    contact: {
        type: {
            email: { type: String, required: true },
            username: {type:String , required: true},
        },
        required: true
    },

}, { timestamps: true })


orderSchema.index({ userId: 1, createdAt: -1 })
orderSchema.index({ "items.artistId": 1 })
orderSchema.index({ status: 1, createdAt: -1 })


orderSchema.pre("save", function () {
    let totalAmount = 0
    
    this.items.forEach((item) => {
        item.subtotal = item.price * item.quantity
        totalAmount += item.subtotal
    })

    this.totalAmount = totalAmount

})


module.exports = mongoose.model("Order", orderSchema)