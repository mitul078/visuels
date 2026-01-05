const mongoose = require("mongoose")

async function connectDB() {
    await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("DB connected(PROFILE)"))
        .catch(err => console.log("DB error(PROFILE): ", err))
}

module.exports = connectDB