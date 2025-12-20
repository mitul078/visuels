const express = require("express")
const router = express.Router()
const { authMiddleware } = require("../middleware/auth.middleware")
const { checkRole } = require("../middleware/role.middleware")
const { add_cart } = require("./cart.controller")


router.post("/add" , authMiddleware , checkRole("USER") , add_cart)

module.exports = router