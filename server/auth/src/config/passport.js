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
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;

                if (!email) {
                    return done(new Error("No email from Google"), null);
                }

                let user = await User.findOne({ email });

                // 🔹 Case 1: User exists (email or OAuth)
                if (user) {
                    // Link Google account if not linked yet
                    if (!user.googleId) {
                        user.googleId = profile.id;
                        user.authProvider = "GOOGLE";
                        await user.save();
                    }

                    return done(null, user);
                }

                // 🔹 Case 2: New user → create
                user = await User.create({
                    googleId: profile.id,
                    name: profile.displayName || "USER",
                    email,
                    username: email.split("@")[0],
                    authProvider: "GOOGLE",
                    isVerified: true,
                });

                // 🔔 Publish ONLY on creation
                await publishToQueue("AUTH_SERVICE:USER_CREATED", {
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    name: user.name,
                });

                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);


module.exports = passport;
