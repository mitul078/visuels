const express = require("express")
const { email_signup, verify_email_otp, gmail_signin } = require("./user.controller")
const router = express.Router()
const passport = require("passport")


router.post("/email-signup", email_signup)
router.post("/email-verify", verify_email_otp)

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }))
router.get("/google/callback", passport.authenticate("google", {
    failureRedirect: "/email-signin",
    session: false
}), gmail_signin)



module.exports = router