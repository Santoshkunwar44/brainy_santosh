var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");
const { createGoogleUser } = require('../services/authService');
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SITE_URL}/api/passport/google/callback`,
    passReqToCallback: true
},
    async function (request, accessToken, refreshToken, profile, done) {
        const googleUser = {
            username: profile.displayName,
            email: profile._json.email,
            profilePicture: profile._json.picture,
            authId: profile.id,
            loginMethod: "google"
        };


        try {
            const theGoogleUser = await createGoogleUser(googleUser)
            done(null, theGoogleUser)
        } catch (error) {
            console.log(error)

        }
    }
));



passport.serializeUser((user, done) => {
    done(null, user)

})
passport.deserializeUser((user, done) => {
    done(null, user)
})