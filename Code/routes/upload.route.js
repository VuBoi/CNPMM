var express = require('express');
var router = express.Router();
var controller = require('../controllers/upload.controller')
var util = require('../util/util'); //middleware check permission 

router.post('/', util.isAuth, util.isAdmin, controller.uploadFile);

module.exports = router;