const { subscribeToQueue } = require("./broker")
const Cart = require("../modules/cart.model")


module.exports = () => {
    subscribeToQueue("PRODUCT_SERVICE:PRICE_CHANGED", async (data) => {
        console.log(data)
    })
}