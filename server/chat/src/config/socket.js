const { Server } = require("socket.io")

let io
function socketServer(server) {
    io = new Server(server)

    io.on("connection", (socket) => {
        console.log("Socket connected: ", socket.id)
        console.log(socket.handshake)

        socket.on("disconnected", (socket) => {
            console.log("Socket disconnected: ", socket.id)
        })
    })

    return io
}

const getIo = () => {
    if (!io)
        throw new Error("Socket not connected.")

    return io
}



module.exports = { socketServer, getIo }