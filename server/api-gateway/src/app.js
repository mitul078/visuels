const express = require("express")
const errorHandler = require("./middlewares/error.middleware")
const { createProxyMiddleware } = require("http-proxy-middleware")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")

app.use(cookieParser())


app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
}))



const createProxy = (target, prefix) => {
    return createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: (path, req) => {
            return prefix + path
        },
        onError: (err, req, res) => {
            console.error("Proxy error:", err.message)
            if (!res.headersSent) {
                res.status(502).json({
                    status: false,
                    message: "Bad Gateway - Service unavailable"
                })
            }
        }
    })
}



app.use("/auth", createProxy("http://localhost:4001", "/api/v1/auth"))

app.use("/products", createProxy("http://product:4002", "/api/v1/products"))

app.use("/order", createProxy("http://order:4003", "/api/v1/order"))

app.use("/message", createProxy("http://message:4004", "/api/v1/message"))

app.use("/job", createProxy("http://localhost:4005", "/api/v1/job"))




app.use(errorHandler)





module.exports = app