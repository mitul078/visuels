const express = require("express")
const { authMiddleware } = require("../middlewares/auth.middleware")
const { checkRole } = require("../middlewares/role.middleware")
const { createOrder } = require("./order.controller")
const router = express.Router()

router.get("/" , authMiddleware , checkRole("USER") , createOrder)

module.exports = router