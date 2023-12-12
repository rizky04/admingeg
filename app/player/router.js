var express = require('express');
var router = express.Router();
const {landingPage, detailPage, category} = require('./controller');

router.get('/landingPage', landingPage);
router.get('/:id/detailPage', detailPage);
router.get('/category', category);

module.exports = router;
 