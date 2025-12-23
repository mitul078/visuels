const axios = require("axios")
const { getServiceToken } = require("../utils/serviceToken")

exports.me = async (userId) => {


    const token = getServiceToken()
    const res = await axios.get(`${process.env.AUTH_SERVICE_URL}/internal/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "x-user-id": userId
        }
    })


    return res.data.user


}
