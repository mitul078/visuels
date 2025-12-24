require("dotenv").config()

const app = require("./src/app")
const { connect } = require("./src/broker/broker")
const connectDB = require("./src/config/db")
const setListeners = require("./src/broker/listeners")


connectDB()
connect()

app.listen(process.env.PORT, () => {
    console.log("Server start(ORDER)")
})