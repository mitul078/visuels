const express = require("express")
const { email_signup, verify_email_otp, gmail_signin, email_signin, me, artist_by_id, check_user_exists } = require("./user.controller")
const router = express.Router()
const passport = require("passport")
const { authMiddleware } = require("../middlewares/auth.middleware")
const { validateService } = require("../middlewares/service.validation")


router.post("/email-signup", email_signup)
router.post("/email-verify", verify_email_otp)
router.post("/email-signin", email_signin)


router.get("/me", authMiddleware, me)


router.get("/internal/me", validateService(["ORDER_SERVICE"]), me)

router.get("/internal/:id", validateService(["ORDER_SERVICE", "PRODUCT_SERVICE" , "PROFILE_SERVICE"]), artist_by_id)

router.get("/internal/check/:id", validateService(["MESSAGE_SERVICE"]), check_user_exists)

router.get("/google", (req, res, next) => {
    const { mode } = req.query
    const { role } = req.query

    if (!mode || !["signin", "signup"].includes(mode)) {
        return res.status(400).send("Mode is required and must be 'signup' or 'signin'");
    }
    passport.authenticate("google", {
        scope: ["profile", "email"],
        state: JSON.stringify({ mode, role }),
    })(req, res, next)
})

router.get("/google/callback", (req, res, next) => {
    passport.authenticate("google", { session: false, }, (err, user, info) => {
        if (err) {
            return res.redirect(`${process.env.FRONTEND_URL}/auth/signin?error=GOOGLE_FAILED`)
        }

        if (!user) {
            const error = encodeURIComponent(info?.message || "AUTH_FAILED")
            return res.redirect(`${process.env.FRONTEND_URL}/auth/signin?error=${error}`)
        }
        req.user = user
        return gmail_signin(req, res, next)
    })(req, res, next)
});


module.exports = router