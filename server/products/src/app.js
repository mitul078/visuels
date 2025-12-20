const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const  errorHandler  = require("./middlewares/error.middleware")

app.use(express.json())
app.use(cookieParser())



app.use("/api/v1/products" , require("./modules/product.route"))
app.use("/internal/products" , require("./modules/internal.route"))


app.use(errorHandler)






module.exports = app