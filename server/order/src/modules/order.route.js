const express = require("express")
const { authMiddleware } = require("../middlewares/auth.middleware")
const { checkRole } = require("../middlewares/role.middleware")
const {  create_order_cart, get_artist_order, get_order_by_id, get_my_orders, update_order } = require("./order.controller")
const router = express.Router()

router.post("/create" , authMiddleware , checkRole("USER") , create_order_cart)
router.get("/artist" , authMiddleware , checkRole("ARTIST"), get_artist_order)
router.get("/user/:id" , authMiddleware , checkRole("USER") , get_order_by_id)
router.get("/my" , authMiddleware , checkRole("USER") , get_my_orders)
router.patch("/artist/:id" , authMiddleware , checkRole("ARTIST") , update_order)


module.exports = router