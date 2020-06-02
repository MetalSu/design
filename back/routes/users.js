var express = require('express');
var router = express.Router();

const usersContro = require('../controller/usersContro');
/* GET users listing. */
router.post('/loginup', usersContro.loginup);
router.post('/loginin', usersContro.loginin);
router.post('/isloginin', usersContro.isloginin);
router.post('/isroot', usersContro.isRoot);
module.exports = router;
