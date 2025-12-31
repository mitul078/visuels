const express = require("express")
const { email_signup, verify_email_otp, gmail_signin, email_signin, me, artist_by_id, user_by_id, check_user_exists } = require("./user.controller")
const router = express.Router()
const passport = require("passport")
const { authMiddleware } = require("../middlewares/auth.middleware")
const { validateService } = require("../middlewares/service.validation")


router.post("/email-signup", email_signup)
router.post("/email-verify", verify_email_otp)
router.post("/email-signin", email_signin)


router.get("/me", authMiddleware, me)


router.get("/internal/me", validateService(["ORDER_SERVICE"]), me)
router.get("/internal/:id", validateService(["ORDER_SERVICE"]), artist_by_id)

router.get("/internal/check/:id", validateService(["MESSAGE_SERVICE"]), check_user_exists)

router.get("/google",
    (req, res, next) => {
        const action = req.query.action || "signin"; // Default to signin
        // Store action in a cookie to access it in the callback
        res.cookie("oauth_action", action, {
            maxAge: 5 * 60 * 1000, // 5 minutes
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });
        passport.authenticate("google", {
            scope: ["profile", "email"],
            state: action, // Pass action as state for OAuth
        })(req, res, next);
    }
);

router.get(
    "/google/callback",
    (req, res, next) => {
        // Get action from cookie or state, then clear the cookie
        const action = req.cookies?.oauth_action || req.query.state || "signin";
        const redirectPath = action === "signup" ? "/signup" : "/signin";
        
        // Clear the oauth_action cookie
        res.clearCookie("oauth_action", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });
        
        passport.authenticate("google", {
            failureRedirect: `${process.env.FRONTEND_URL}${redirectPath}?oauthError=`,
            session: false,
            failWithError: false, // Don't throw error, redirect instead
        }, (err, user, info) => {
            if (err) {
                // Handle specific error types
                let errorMessage = "google_failed";
                if (err.message === "USER_NOT_FOUND") {
                    errorMessage = "user_not_found";
                } else if (err.message === "USER_ALREADY_EXISTS") {
                    errorMessage = "user_already_exists";
                } else if (err.message === "NO_EMAIL") {
                    errorMessage = "no_email";
                } else if (err.message === "INVALID_ACTION") {
                    errorMessage = "invalid_action";
                }
                return res.redirect(`${process.env.FRONTEND_URL}${redirectPath}?oauthError=${errorMessage}`);
            }
            if (!user) {
                return res.redirect(`${process.env.FRONTEND_URL}${redirectPath}?oauthError=authentication_failed`);
            }
            req.user = user;
            req.query.state = action; // Preserve action for controller
            next();
        })(req, res, next);
    },
    gmail_signin
);







module.exports = router