const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile/:uid', passport.checkAuthentication, usersController.user_profile);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);
router.post('/createSession', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
), usersController.createSession);
router.post('/update/:id', usersController.update);

router.get('/sign-out', usersController.destroySession);

module.exports = router;