const express=  require("express")
const router  = express.Router()
const multer = require("multer")
const { authMiddleware } = require("../middlewares/auth.middleware")
const { checkRole } = require("../middlewares/role.middleware")
const { add_product, see_products, product_by_id, update_product, delete_product, get_logged_artist_products } = require("./product.controller")
const { validService } = require("../middlewares/service.middleware")


const storage = multer.memoryStorage()
const upload = multer({storage})

router.post("/" ,authMiddleware , checkRole("ARTIST") , upload.array("images" , 5) ,add_product )
router.get("/" , authMiddleware , see_products)
router.get("/:id" , authMiddleware  , product_by_id)
router.patch("/:id" , authMiddleware , checkRole("ARTIST") , update_product) //productId
router.delete("/:id" , authMiddleware , checkRole("ARTIST") , delete_product) //productId
router.get("/me/products" , authMiddleware , checkRole("ARTIST") , get_logged_artist_products)
router.get("/internal/:id" , validService(["CART_SERVICE"]) , product_by_id)

module.exports = router