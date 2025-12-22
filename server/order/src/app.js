const cookieParser = require("cookie-parser")
const express = require("express")
const errorMiddleware = require("./middlewares/error.middleware")
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/order" , require("./modules/order.route"))
app.use(errorMiddleware)

module.exports = app