var express = require('express');
var router = express.Router();
const {landingPage, detailPage, category, checkout, voucher, history, historyDetail} = require('./controller');
const { isLoginPlayer } = require('../middleware/auth')

router.get('/landingPage', landingPage);
router.get('/:id/detailPage', detailPage);
router.get('/category', category);
router.post('/checkout', isLoginPlayer, checkout);
router.get('/:id/voucher', voucher);
router.get('/history', isLoginPlayer, history);
router.get('/history/:id/historyDetail', historyDetail);

module.exports = router;
 