require("dotenv").config()

const app = require("./src/app")
const { connect } = require("./src/broker/broker")
const setListeners = require("./src/broker/listeners")

connect().then(() => {
    setListeners()
})


app.listen(process.env.PORT, () => {
    console.log("Server started(JOBS)")
})