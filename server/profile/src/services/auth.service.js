const {getServiceToken} = require("../utils/serviceToken")
const axios = require("axios")

exports.get_artist = async(id  , artistId) => {
    const token = getServiceToken()
    try {

        const res = await axios.get(`${process.env.AUTH_SERVICE_URL}/internal/${artistId}` , {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-user-id": id
            }
        })
        return res.data.user
        
    } catch (error) {
        throw error
    }
}