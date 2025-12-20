const axios = require("axios")
const { getServiceToken } = require("../utils/serviceToken")

exports.getProductById = async (productId) => {
    const token = getServiceToken()

    const response = await axios.get(
        `http://localhost:4002/internal/products/${productId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    

    return response.data.product
}
