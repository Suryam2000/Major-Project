const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile/:uid', passport.checkAuthentication, usersController.user_profile);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.use('/forgot-pass', require('./forgotpass'));

router.post('/reset_password/:id', usersController.resetfinalpass);

router.post('/identity_status', usersController.identityStatus);

router.post('/create', usersController.create);
router.post('/createSession', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
), usersController.createSession);
router.post('/update/:id', usersController.update);

router.get('/sign-out', usersController.destroySession);


router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), usersController.createSession);



module.exports = router;