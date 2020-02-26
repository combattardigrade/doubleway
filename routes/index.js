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
const apiController = require('../controllers/api')

router.get('/', generalController.renderHome)
router.get('/login', generalController.renderLogin)
router.get('/signup', generalController.renderSignup)
router.get('/comofunciona', generalController.renderComofunciona)
router.get('/faq', generalController.renderFaq)
router.get('/faqeth', generalController.renderFaqEth)
router.get('/terminos', generalController.renderTerminos)
router.get('/logout', generalController.logout)

router.get('/api/userData/:userAddress', apiController.getUserData)
router.get('/api/platformData', apiController.getPlatformData)
router.get('/api/updateData', apiController.updateData)
router.get('/api/setUserAddress/:userAddress', apiController.setUserAddress)
router.get('/api/checkRefId/:rid', apiController.checkRefId)

router.get('/dashboard', generalController.renderDashboard)
router.get('/reflinks', generalController.renderRefLinks)
router.get('/qrcodes', generalController.renderQrCodes)
router.get('/transactions', generalController.renderTransactions)
router.get('/stats', generalController.renderStats)
router.get('/referrals', generalController.renderReferrals)
router.get('/uplines', generalController.renderUplines)

module.exports = router