const express = require('express');
const userController = require('./../controllers/user.controller');

const router = express.Router();

//TODO: DEFINIR ENDPOINTS

router.route('/').get(userController.findAllUsers);

module.exports = router;
