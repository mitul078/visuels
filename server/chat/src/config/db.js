const mongoose = require("mongoose")

async function connectDB() {
    await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("DB connected(CHAT)"))
        .catch(err => console.log("DB error(CHAT): ", err))
}

module.exports = connectDB