var express = require('express');
var router = express.Router();
var controller = require('../controllers/user.controller');
var util = require('../util/util'); //middleware check permission 

router.get('/', util.isAuth, util.isAdmin, controller.index);
router.get('/:id', controller.get);
router.post('/signin', controller.postSignin);
router.post('/signup', controller.postSignup);
router.put('/profile', util.isAuth, controller.putUserProfile)
router.put('/:id', util.isAuth, util.isAdmin, controller.putUser)
router.get('/create/admin', controller.createAdmin);
router.delete('/:id', util.isAuth, util.isAdmin, controller.delete);

module.exports = router;