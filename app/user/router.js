var express = require('express');
var router = express.Router();
const {viewSigin, actionSignin, actionLogout} = require('./controller');


router.get('/', viewSigin);
router.post('/', actionSignin);
router.get('/actionLogout', actionLogout);


module.exports = router;
 