const express = require("express")
const { email_signup, verify_email_otp } = require("./user.controller")
const router = express.Router()

router.post("/email-signup" , email_signup)
router.post("/email-verify" , verify_email_otp)

module.exports = router