const express = require("express")
const router = express.Router()
const { authMiddleware } = require("../../middlewares/auth.middleware")
const { checkRole } = require("../../middlewares/role.middleware")
const { me, update_profile, complete_artist_profile , artist_profile , artist_full_profile } = require("./artist.controller")
const upload = require("../../middlewares/upload.middleware")

router.get("/me", authMiddleware, checkRole("ARTIST"), me)
router.get("/artist-profile", authMiddleware, checkRole("USER"), artist_profile)
router.get("/artist-full-profile", authMiddleware, checkRole("USER"), artist_full_profile)


router.post
    ("/create",
        authMiddleware,
        checkRole("ARTIST"),
        upload.fields([{ name: "avatar", maxCount: 1 }, { name: "banner", maxCount: 1 }]),
        complete_artist_profile
    )


router.patch
    (
        "/update",
        authMiddleware,
        checkRole("ARTIST"),
        upload.fields([{ name: "avatar", maxCount: 1 }, { name: "banner", maxCount: 1 }]),
        update_profile
    )


module.exports = router