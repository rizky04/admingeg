var express = require('express');
var router = express.Router();
const {landingPage, detailPage, category, checkout, voucher, history, historyDetail, dashboard, profile, editProfile} = require('./controller');
const { isLoginPlayer } = require('../middleware/auth')
const multer = require('multer');
const os = require('os');


router.get('/landingPage', landingPage);
router.get('/:id/detailPage', detailPage);
router.get('/category', category);
router.post('/checkout', isLoginPlayer, checkout);
router.get('/:id/voucher', voucher);
router.get('/history', isLoginPlayer, history);
router.get('/history/:id/historyDetail',isLoginPlayer, historyDetail);
router.get('/dashboard', isLoginPlayer, dashboard);
router.get('/profile', isLoginPlayer, profile);
router.put('/profile',multer({dest: os.tmpdir()}).single('image'), isLoginPlayer, editProfile);

module.exports = router;
 