const axios = require("axios")

const { getServiceToken } = require("../utils/serviceToken")

exports.check_exist = async (id, userId) => {
    try {
        const token = getServiceToken()

        const { data } = await axios.get(
            `${process.env.AUTH_SERVICE_URL}/internal/check/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "x-user-id": userId
                }
            }
        )

        return data

    } catch (error) {
        throw error
    }
}
