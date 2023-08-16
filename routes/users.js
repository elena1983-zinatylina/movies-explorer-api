const router = require('express').Router();

const { getUserInfo, updateUserInfo} = require('../controllers/users');
const { userInfoValidator } = require('../middlewares/validation');

router.get('/users/me', getUserInfo);
router.patch('/users/me', userInfoValidator, updateUserInfo);

module.exports = router;