const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../modules/user.model");
const {publishToQueue} = require("../broker/broker")

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/v1/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    user = await User.create({
                        googleId: profile.id,
                        name: profile.displayName || "USER",
                        email: profile.emails?.[0]?.value,
                        username: profile.emails?.[0]?.value.split("@")[0],
                        authProvider: "GOOGLE"
                    });
                }

                await publishToQueue("AUTH_SERVICE:USER_CREATED", {
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    name: user.name
                })

                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);


module.exports = passport;
