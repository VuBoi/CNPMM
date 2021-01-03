var express = require('express');
var router = express.Router();
var controller = require('../controllers/search.controller');

router.get('/products', controller.searchProduct);

module.exports = router;