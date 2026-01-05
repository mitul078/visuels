const express = require("express")
const errorMiddleware = require("./middlewares/error.middleware")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
}))
app.use("/api/v1/user/profile", require("./modules/user/user.route"))
app.use("/api/v1/artist/profile", require("./modules/artist/artist.route"))

app.use(errorMiddleware)

module.exports = app