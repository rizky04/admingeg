var express = require('express');
var router = express.Router();
const {viewSigin, actionSignin} = require('./controller');


router.get('/', viewSigin);
router.post('/', actionSignin);


module.exports = router;
 