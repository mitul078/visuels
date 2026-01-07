const express = require("express")
const { authMiddleware } = require("../../middlewares/auth.middleware")
const { checkRole } = require("../../middlewares/role.middleware")
const { me, update_profile } = require("./user.controller")
const router = express.Router()

router.get("/me", authMiddleware, checkRole("USER"), me)
router.patch("/update", authMiddleware, checkRole("USER"), update_profile)


module.exports = router