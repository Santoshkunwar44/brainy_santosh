const router = require("express").Router()
const passport = require("passport")
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: `${process.env.SITE_URL}/authenticate` }),
    function (req, res) {
        res.redirect(`${process.env.SITE_URL}`)
    });

module.exports = router