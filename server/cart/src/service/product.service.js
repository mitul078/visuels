const axios = require("axios")
const { getServiceToken } = require("../utils/serviceToken")

exports.getProductById = async (productId , userId) => {
    const token = getServiceToken()

    const response = await axios.get(
        `${process.env.PRODUCT_SERVICE_URL}/internal/${productId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-user-id": userId
            }
        }
    )

    console.log(response.data.product)

    return response.data.product
}
