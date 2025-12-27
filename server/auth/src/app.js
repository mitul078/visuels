const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const errorMiddleware = require("./middlewares/error.middleware")
const passport = require("./config/passport")
const cors = require("cors")

app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
}))




app.use("/api/v1/auth", require("./modules/user.route"))
app.use(errorMiddleware)


module.exports = app