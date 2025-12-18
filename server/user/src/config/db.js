const mongoose = require("mongoose")

async function connectDB() {
    await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("DB connected(USER)"))
        .catch(err => console.log("DB error(USER): ", err))
}

module.exports = connectDB