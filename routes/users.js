var express = require('express');
var router = express.Router();

var userController = require('../userController');

router.route('/:page?/:perPage?')
    .get(userController.index);
router.route('/')
    .post(userController.new);

module.exports = router;
