var express = require('express');
var router = express.Router();
const {landingPage, detailPage, category, checkout, voucher} = require('./controller');
const { isLoginPlayer } = require('../middleware/auth')

router.get('/landingPage', landingPage);
router.get('/:id/detailPage', detailPage);
router.get('/category', category);
router.post('/checkout', isLoginPlayer, checkout);
router.get('/:id/voucher', voucher);

module.exports = router;
 