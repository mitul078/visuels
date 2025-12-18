const express=  require("express")
const router  = express.Router()
const multer = require("multer")
const { authMiddleware } = require("../middlewares/auth.middleware")
const { checkRole } = require("../middlewares/role.middleware")
const { add_product, see_products, products_by_id, update_product, delete_product } = require("./product.controller")


const storage = multer.memoryStorage()
const upload = multer({storage})

router.post("/" ,authMiddleware , checkRole("ARTIST") , upload.array("images" , 5) ,add_product )
router.get("/" , authMiddleware , see_products)
router.get("/:id" , authMiddleware , checkRole("ARTIST") , products_by_id) //userId
router.patch("/:id" , authMiddleware , checkRole("ARTIST") , update_product) //productId
router.delete("/:id" , authMiddleware , checkRole("ARTIST") , delete_product) //productId

module.exports = router