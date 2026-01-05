const express = require("express")
const router = express.Router()
const { authMiddleware } = require("../../middlewares/auth.middleware")
const { checkRole } = require("../../middlewares/role.middleware")
const { me, update_profile } = require("./artist.controller")
const upload = require("../../middlewares/upload.middleware")

router.get("/me", authMiddleware, checkRole("ARTIST"), me)
router.patch
    (
        "/update",
        authMiddleware,
        checkRole("ARTIST"),
        upload.fields([{ name: "avatar", maxCount: 1 }, { name: "banner", maxCount: 1 }]),
        update_profile
    )


module.exports = router