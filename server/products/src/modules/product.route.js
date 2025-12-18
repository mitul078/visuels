const express=  require("express")
const router  = express.Router()
const multer = require("multer")
const { authMiddleware } = require("../middlewares/auth.middleware")
const { checkRole } = require("../middlewares/role.middleware")
const { add_product } = require("./product.controller")



const storage = multer.memoryStorage()
const upload = multer({storage})

router.post("/" ,authMiddleware , checkRole("ADMIN" , "ARTIST") , upload.array("images" , 5) ,add_product )

module.exports = router