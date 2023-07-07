const router = require('express').Router();
const userRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const { signinValidator, signupValidator } = require('../middlewares/validation');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../utils/errors/NotFoundError');

router.post('/signin', signinValidator, login);

router.post('/signup', signupValidator, createUser);

router.use(auth);

router.use('/', userRouter);

router.use('/', moviesRouter);

router.use('*', (req, res, next) => next(new NotFoundError('Страница не найдена')));

module.exports = router;