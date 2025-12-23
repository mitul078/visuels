const axios = require("axios")
const { getServiceToken } = require("../utils/serviceToken")

exports.getProducts = async (userId) => {

    const token = getServiceToken()

    const res = await axios.get(`${process.env.CART_SERVICE_URL}/internal/cart`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-user-id": userId
            }
        })

    return res.data.cart

}