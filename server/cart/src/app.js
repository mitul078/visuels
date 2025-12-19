const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const errorHandler = require("./middleware/error.middleware")

app.use(express.json())
app.use(cookieParser())



app.use("/api/v1/cart" , require("./modules/cart.route"))
app.use(errorHandler)

module.exports = app