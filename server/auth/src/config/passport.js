const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../modules/user.model");
const { publishToQueue } = require("../broker/broker")

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/v1/auth/google/callback", // via gateway
            passReqToCallback: true, // Enable access to req in callback
        },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;

                if (!email) {
                    return done(new Error("NO_EMAIL"), null);
                }

                // Get the action (signin or signup) from cookie or state parameter
                const rawAction = req.cookies?.oauth_action || req.query?.state || "signin";
                const action = rawAction === "signup" ? "signup" : "signin";

                let user = await User.findOne({ email });

                // For signin: user must exist
                if (action === "signin") {
                    if (!user) {
                        return done(new Error("USER_NOT_FOUND"), null);
                    }
                    // User exists, proceed with signin
                    return done(null, user);
                }

                // For signup: user must not exist
                if (action === "signup") {
                    if (user) {
                        return done(new Error("USER_ALREADY_EXISTS"), null);
                    }

                    // Create new user
                    user = await User.create({
                        googleId: profile.id,
                        name: profile.displayName || "USER",
                        email,
                        username: email.split("@")[0],
                        authProvider: "GOOGLE",
                        isEmailVerified: true,
                    });

                    // 🔔 Publish ONLY on creation
                    await publishToQueue("AUTH_SERVICE:USER_CREATED", {
                        username: user.username,
                        email: user.email,
                        role: user.role,
                        name: user.name,
                    });

                    return done(null, user);
                }

                return done(new Error("INVALID_ACTION"), null);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);


module.exports = passport;

