const axios = require("axios")

const { getServiceToken } = require("../utils/serviceToken")

exports.users = async (userId) => {
    const token = getServiceToken()

    const res = await axios.get(`${process.env.AUTH_SERVICE_URL}/internal/users`, {
        headers: {
            Authorization:`Bearer ${token}`,
            "x-user-id": userId
        }
    })


    return res.data.users
}
exports.artists = async (userId) => {
    const token = getServiceToken()

    const res = await axios.get(`${process.env.AUTH_SERVICE_URL}/internal/artists`, {
        headers: {
            Authorization:`Bearer ${token}`,
            "x-user-id": userId
        }
    })


    return res.data.artists
}