var express = require('express');
var router = express.Router();
var controller = require('../controllers/product.controller');
var util = require('../util/util'); //middleware check permission

router.get('/', controller.index);
router.get('/:id', controller.get);
router.post('/', util.isAuth, util.isStaffOrAdmin, controller.postCreate);
router.put('/:id', util.isAuth, util.isStaffOrAdmin, controller.put);
router.delete('/:id', util.isAuth, util.isStaffOrAdmin, controller.delete);
router.post('/:id/reviews', util.isAuth, controller.Rating);
// 

module.exports = router;