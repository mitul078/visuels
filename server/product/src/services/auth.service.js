const axios = require("axios")
const { getServiceToken } = require("../utils/serviceToken")

exports.get_artist_detail = async (userId, artistId) => {
    const token = getServiceToken()

    try {

        const res = await axios.get(`${process.env.AUTH_SERVICE_URL}/internal/${artistId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-user-id": userId
            }
        })

        return res.data.user

    } catch (error) {
        throw (error)

    }
}

