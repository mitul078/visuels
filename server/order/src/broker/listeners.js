const { subscribeToQueue } = require("./broker")

const Order = require("../modules/order.model")

module.exports = () => {
    subscribeToQueue("PRODUCT_SERVICE:PRICE_CHANGED", async (data) => {
        const { productId, price } = data
        
        

        await Order.updateOne(
            { "item.productId": productId },
            [
                {
                    $set: {
                        item: {
                            $cond: [
                                { $eq: ["$item.productId", productId] },
                                {
                                    $mergeObjects: [
                                        "$item",
                                        { price: price, subtotal: { $multiply: ["$item.quantity", price] } }
                                    ]
                                },
                                "$item"
                            ]

                        }
                    }
                },
                {
                    $set: {
                        totalAmount: "$item.subtotal"
                    }
                }
            ],
            {
                updatePipeline: true
            }
        )
    })
}