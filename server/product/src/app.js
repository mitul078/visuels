const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const errorHandler = require("./middlewares/error.middleware")
const cors = require("cors")

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
}))


app.use("/api/v1/products", require("./modules/product.route"))
app.use(errorHandler)


module.exports = app