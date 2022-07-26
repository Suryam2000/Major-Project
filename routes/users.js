const express = require('express');

const router = express.Router();
const usersController = require('../controllers/users_controller');

router.get('/', usersController.user_profile);

module.exports = router;