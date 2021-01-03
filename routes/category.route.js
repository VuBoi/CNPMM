var express = require('express');
var router = express.Router();
var controller = require('../controllers/category.controller');
var util = require('../util/util'); //middleware check permission 

router.get('/', controller.index);
router.post('/', util.isAuth, util.isStaffOrAdmin, controller.post);
router.put('/:id', util.isAuth, util.isStaffOrAdmin, controller.put)
router.delete('/:id', util.isAuth, util.isStaffOrAdmin ,controller.delete);
router.get('/:id', controller.get);

module.exports = router;