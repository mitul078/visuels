const cookieParser = require("cookie-parser")
const express = require("express")
const errorMiddleware = require("./middlewares/error.middleware")
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cookieParser())


app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
}))

app.use("/api/v1/message", require("./modules/message.route"))

app.use(errorMiddleware)

module.exports = app
