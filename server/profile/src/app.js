const express = require("express")
const errorMiddleware = require("./middlewares/error.middleware")

const app = express()

app.use("/user/profile", require("./modules/user/user.route"))
app.use("/artist/profile", require("./modules/artist/artist.route"))

app.use(errorMiddleware)

module.exports = app