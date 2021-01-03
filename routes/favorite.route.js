var express = require('express');
var router = express.Router();
var controller = require('../controllers/favorite.controller');
var util = require('../util/util'); //middleware check permission

router.get('/myfavorites', util.isAuth, controller.getMyFavorite);
router.post('/', util.isAuth, controller.post);
router.delete('/:id', util.isAuth, controller.delete);
router.delete('/productId/:id', util.isAuth, controller.deleteProductId);

module.exports = router;