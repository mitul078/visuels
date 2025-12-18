require("dotenv").config()
const app = require("./src/app")
const connectDB = require("./src/config/db")
const {connect} = require("./src/broker/broker")

connectDB() //db
connect() //rabbit server


app.listen(process.env.PORT , () => {
    console.log("Server start(PRODUCTS)")
})