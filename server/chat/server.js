require("dotenv").config()
const app = require("./src/app")
const connectDB = require("./src/config/db")
const {connect} = require("./src/broker/broker")
const http = require("http")
const {socketServer} = require("./src/config/socket")



const server = http.createServer(app)
socketServer(server)

connectDB()
connect()

server.listen(process.env.PORT , () => {
    console.log("Server start(CHAT)")
})
