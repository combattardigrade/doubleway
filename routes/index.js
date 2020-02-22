const express = require('express')
const router = express.Router()
const jwt = require('express-jwt')
const auth = jwt({
    secret: process.env.JWT_SECRET,
    getToken: function(req) {
        if(req.cookies.token !== undefined) {
            return req.cookies.token
        } else {
            throw new Error('missing_admin_token_cookie')
        }
    }
})

const generalController = require('../controllers/general')

router.get('/', generalController.renderHome)
router.get('/login', generalController.renderLogin)
router.get('/signup', generalController.renderSignup)
router.get('/comofunciona', generalController.renderComofunciona)
router.get('/faq', generalController.renderFaq)
router.get('/faqeth', generalController.renderFaqEth)
router.get('/terminos', generalController.renderTerminos)

router.get('/dashboard', generalController.renderDashboard)
module.exports = router