const express = require("express")
const { authMiddleware } = require("../middleware/auth.middleware")
const { checkRole } = require("../middleware/role.middleware")
const { add_cart } = require("./cart.controller")
const router = express.Router()


router.post("/" , authMiddleware , checkRole("USER") , add_cart)

module.exports = router