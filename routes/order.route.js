var express = require('express');
var router = express.Router();
var controller = require('../controllers/order.controller');
var util = require('../util/util'); //middleware check permission

router.get('/', util.isAuth, util.isStaffOrAdmin, controller.getOrder);
router.get('/myorders', util.isAuth, controller.getMyOrder);
router.get('/:id', util.isAuth, controller.getOrderDetail);
router.post('/', util.isAuth, controller.postCreate);
router.put('/:id/pay', util.isAuth, controller.putPayment);
router.delete('/:id', util.isAuth, util.isStaffOrAdmin, controller.delete);
router.put('/:id/deliver', util.isAuth, util.isStaffOrAdmin, controller.putDeliver);
router.put('/:id/receive', util.isAuth, controller.putReceive);

module.exports = router;