const express = require("express")
const router = express.Router()
const { authMiddleware } = require("../middlewares/auth.middleware")
const { checkRole } = require("../middlewares/role.middleware")
const { send_message, get_message } = require("./message.controller")

router.post("/send/:id" , authMiddleware , checkRole("ARTIST" , "USER") , send_message)



module.exports = router