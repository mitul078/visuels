const axios = require("axios")
const { getServiceToken } = require("../utils/serviceToken")

exports.get_artist_detail = async (userId, artistIds) => {
    const token = getServiceToken()

    try {

        const res = await axios.post(`${process.env.AUTH_SERVICE_URL}/internal/artists/bulk`, { artistIds }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-user-id": userId
            }
        })

        return res.data.users

    } catch (error) {
        throw (error)

    }
}