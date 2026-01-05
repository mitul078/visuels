const imagekit = require("../config/imagekit")

exports.deleteImage = async (fileId) => {
    if (!fileId) return
    await imagekit.deleteFile(fileId)
}
