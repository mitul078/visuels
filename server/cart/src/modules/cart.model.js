const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true, index: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, required: true },
            artistId: {type:String, required: true},
            image: { type: String, required: true },
            title: { type: String, required: true },
            quantity: { type: Number, default: 1, min: 1 },
            price: { type: Number, min: 0, required: true },
            subtotal: { type: Number, min: 0}
        }
    ],
    totalItems: { type: Number, default: 0, min: 0 },
    totalPrice: { type: Number, default: 0, min: 0 },
    status: { type: String, enum: ["ACTIVE", "CHECKED_OUT", "ABANDONED"], default: "ACTIVE", index: true },
    expiresAt: { type: Date, index: { expires: "30d" } }

}, { timestamps: true })


cartSchema.pre("save", function () {
    let totalItems = 0;
    let totalPrice = 0;

    this.items.forEach((item) => {
        item.subtotal = item.price * item.quantity;
        totalItems += item.quantity;
        totalPrice += item.subtotal;
    });

    this.totalItems = totalItems;
    this.totalPrice = totalPrice;

});


module.exports = mongoose.model("Cart", cartSchema)