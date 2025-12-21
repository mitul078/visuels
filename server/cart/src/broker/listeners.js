const { subscribeToQueue } = require("./broker")
const Cart = require("../modules/cart.model")
const mongoose = require("mongoose")


module.exports = () => {
    subscribeToQueue("PRODUCT_SERVICE:PRICE_CHANGED", async (data) => {
        const { productId, price } = data
        const pid = new mongoose.Types.ObjectId(productId)
        console.log(data)
        await Cart.updateMany(
            { "items.productId": pid },
            [
                {
                    $set: {
                        items: {
                            $map: {
                                input: "$items",
                                as: "item",
                                in: {
                                    $cond: [
                                        {
                                            $eq: ["$$item.productId", pid]
                                        },
                                        {
                                            $mergeObjects: [
                                                "$$item",
                                                {
                                                    price: price,
                                                    subtotal: {
                                                        $multiply: ["$$item.quantity", price]
                                                    }
                                                }
                                            ]
                                        },
                                        "$$item"
                                    ]
                                }
                            }

                        }
                    }
                },
                {
                    $set: {
                        totalItems: {
                            $sum: "$items.quantity"
                        },
                        totalPrice: {
                            $sum: "$items.subtotal"
                        }
                    }
                }
            ],
            {
                updatePipeline: true
            }
        )
    })
}