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
router.get('/login/:language?', generalController.renderLogin)
router.get('/signup/:language?', generalController.renderSignup)
router.get('/comofunciona/:language?', generalController.renderComofunciona)
router.get('/faq/:language?', generalController.renderFaq)
router.get('/faqeth/:language?', generalController.renderFaqEth)
router.get('/terminos/:language?', generalController.renderTerminos)
router.get('/logout', generalController.logout)

router.get('/api/userData/:userAddress', apiController.getUserData)
router.get('/api/platformData', apiController.getPlatformData)
router.get('/api/updateData', apiController.updateData)
router.get('/api/updatePrices', apiController.updatePrices)
router.get('/api/setUserAddress/:userAddress', apiController.setUserAddress)
router.get('/api/checkRefId/:rid', apiController.checkRefId)
router.get('/api/getReferrals/:userId', apiController.getReferrals)
router.get('/api/checkUserExists/:userAddress', apiController.checkUserExists)

router.get('/dashboard', generalController.renderDashboard)
router.get('/reflinks', generalController.renderRefLinks)
router.get('/qrcodes', generalController.renderQrCodes)
router.get('/transactions', generalController.renderTransactions)
router.get('/stats', generalController.renderStats)
router.get('/referrals', generalController.renderReferrals)
router.get('/uplines', generalController.renderUplines)


router.get('/adminDashboard', generalController.renderAdminDashboard)

module.exports = router