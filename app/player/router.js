var express = require('express');
var router = express.Router();
const {landingPage, detailPage, category, checkout} = require('./controller');

router.get('/landingPage', landingPage);
router.get('/:id/detailPage', detailPage);
router.get('/category', category);
router.post('/checkout', checkout);

module.exports = router;
 