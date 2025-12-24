const express = require("express")
const { authMiddleware } = require("../middlewares/auth.middleware")
const { checkRole } = require("../middlewares/role.middleware")
const {  create_order_cart, get_artist_order, get_order_by_id, get_my_orders, update_order, cancel_order } = require("./order.controller")
const router = express.Router()

router.post("/create" , authMiddleware , checkRole("USER") , create_order_cart)
router.get("/artist" , authMiddleware , checkRole("ARTIST"), get_artist_order) //all artist orders
router.get("/user" , authMiddleware , checkRole("USER") , get_my_orders) // placed orders
router.get("/:id" , authMiddleware , checkRole("USER") , get_order_by_id) //get order by id
router.patch("/:id" , authMiddleware , checkRole("ARTIST") , update_order) //update order 
router.delete("/:id/cancel" , authMiddleware , checkRole("USER") , cancel_order) //cancel order


module.exports = router