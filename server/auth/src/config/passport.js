const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../modules/user.model");
const { publishToQueue } = require("../broker/broker")

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/v1/auth/google/callback",
            passReqToCallback: true
        },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                const { mode, role } = JSON.parse(req.query.state)

                if (!["signin", "signup"].includes(mode)) {
                    return done(null, false, { message: "Invalid auth mode" });
                }

                const email = profile.emails?.[0]?.value;


                if (!email) {
                    return done(null, false, { message: "EmailId not found in google" });
                }

                let user = await User.findOne({ email });

                if (mode === "signin") {
                    if (!user) {
                        return done(null, false, { message: "User not found, please signup" })
                    }

                    return done(null, user)
                }

                if (mode === "signup") {
                    if (user)
                        return done(null, false, { message: "User already exists" })

                    if (!["USER", "ARTIST"].includes(role)) {
                        return done(null, false, { message: "Invalid role" });
                    }


                    user = await User.create({
                        googleId: profile?.id,
                        name: profile.displayName || "user",
                        email,
                        username: email.split("@")[0],
                        authProvider: "GOOGLE",
                        isEmailVerified: true,
                        role
                    })


                    await publishToQueue("AUTH_SERVICE:USER_CREATED", {
                        username: user.username,
                        email: user.email,
                        role: user.role,
                        name: user.name,
                    })

                    if (user.role !== "ARTIST") {
                        user.rules = undefined
                        user.artistCreated = undefined
                        user.artistStatus = undefined
                    }

                    await user.save()

                    return done(null, user)
                }
                return done(null, false, { message: "Invalid mode" })
            } catch (err) {
                return done(err);
            }
        }
    )
);


module.exports = passport;

