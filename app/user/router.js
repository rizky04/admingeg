var express = require('express');
var router = express.Router();
const {viewSigin} = require('./controller');

router.get('/', viewSigin);

module.exports = router;
 