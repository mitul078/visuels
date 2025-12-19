const Cart = require("./cart.model")
const AppError = require("../middleware/AppError")
const axios = require("axios")


exports.add_cart = async(req , res , next ) => {
    try {
        
        const {id , quantity} = req.body // id == productId

        const {data} = await axios.get(`${process.env.PRODUCT_SERVICE_URL}/internal/${id}`)


        console.log(data)


    } catch (error) {
        next(error)
    }
}