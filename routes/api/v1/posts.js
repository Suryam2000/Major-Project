const express = require('express');

const router = express.Router();
const passport = require('passport');
const postsApi = require('../../../controllers/api/v1/posts_api');

router.get('/', postsApi.index);
//session:false to prevent cookie to get generated
router.delete('/:id', passport.authenticate('jwt', {session: false}) ,postsApi.destroy);


module.exports = router;