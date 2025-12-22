const express = require("express")
const router = express.Router()
const { authMiddleware } = require("../middleware/auth.middleware")
const { checkRole } = require("../middleware/role.middleware")
const { add_cart, see_cart, update_cart, clear_cart } = require("./cart.controller")
const { validService } = require("../middleware/validateService")


router.post("/add" , authMiddleware , checkRole("USER") , add_cart)
router.get("/" , authMiddleware , checkRole("USER") , see_cart)
router.patch("/:id" , authMiddleware , checkRole("USER") , update_cart)
router.delete("/" , authMiddleware , checkRole("USER") , clear_cart)


router.get("/internal/cart" , validService(["ORDER_SERVICE"]) , see_cart)

module.exports = router