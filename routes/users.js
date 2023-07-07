const router = require('express').Router();

const { findCurrentUser, updateUserProfile } = require('../controllers/users');
const { userInfoValidator } = require('../middlewares/validation');

router.get('/users/me', findCurrentUser);
router.patch('/users/me', userInfoValidator, updateUserProfile);

module.exports = router;