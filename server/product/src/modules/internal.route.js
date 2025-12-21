const express = require("express")
const { validService } = require("../middlewares/service.middleware")
const { get_product_by_id } = require("./internal.controller")
const router = express.Router()

router.get("/:id" , validService(["CART_SERVICE"]) , get_product_by_id)

module.exports = router