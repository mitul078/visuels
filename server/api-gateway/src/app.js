const express = require("express")
const errorHandler = require("./middlewares/error.middleware")
const { createProxyMiddleware } = require("http-proxy-middleware")
const app = express()

const createProxy = (target, prefix) => {
    return createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: (path, req) => {
            const newPath = prefix + path
            return newPath
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

app.use("/auth", createProxy("http://auth:4001", "/api/v1/auth"))

app.use("/products", createProxy("http://product:4002", "/api/v1/products"))

app.use("/order", createProxy("http://order:4003", "/api/v1/order"))

app.use("/message", createProxy("http://message:4004", "/api/v1/message"))

app.use("/job", createProxy("http://jobs:4005", "/api/v1/job"))



app.use(errorHandler)

module.exports = app