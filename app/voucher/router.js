var express = require('express');
var router = express.Router();
const {index, viewCreate, actionCreate, viewEdit, actionEdit, actionDelete} = require('./controller');
const multer = require('multer');
const os = require('os');
/* GET home page. */
router.get('/', index);
router.get('/create',  viewCreate);
router.post('/action', multer({dest: os.tmpdir()}).single('image'), actionCreate);
router.get('/edit/:id', viewEdit);
router.put('/edit/:id', actionEdit);
router.delete('/delete/:id', actionDelete);

module.exports = router;
 