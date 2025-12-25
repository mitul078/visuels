const axios = require("axios")

const { getServiceToken } = require("../utils/serviceToken")

exports.check_exist = async (id , userId) => {
    const token = getServiceToken()

    const res = await axios.get(`${process.env.AUTH_SERVICE_URL}/internal/check/${id}`, {
        headers: {
            Authorization:`Bearer ${token}`,
            "x-user-id": userId
        }
    })

    return res.data
}
