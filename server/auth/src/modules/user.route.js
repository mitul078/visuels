const express = require("express")
const { email_signup, verify_email_otp, gmail_signin, email_signin, me, user_by_id } = require("./user.controller")
const router = express.Router()
const passport = require("passport")
const { authMiddleware } = require("../middlewares/auth.middleware")
const { validateService } = require("../middlewares/service.validation")


router.post("/email-signup", email_signup)
router.post("/email-verify", verify_email_otp)
router.post("/email-signin" , email_signin)


router.get("/me" , authMiddleware , me)
router.get("/internal/me" , validateService(["ORDER_SERVICE"]) , me)
router.get("/internal/:id" , validateService(["ORDER_SERVICE"]) , user_by_id)

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }))
router.get("/google/callback", passport.authenticate("google", {
    failureRedirect: "/email-signin",
    session: false
}), gmail_signin)





module.exports = router