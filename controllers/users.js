const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { STATUS_CODES } = require('../utils/constants');
const BadRequestError = require('../utils/errors/BadRequestError');
const ConflictError = require('../utils/errors/ConflictError');
const NotFoundError = require('../utils/errors/NotFoundError');

const { NODE_ENV, JWT_SECRET = 'JWT_SECRET' } = process.env;

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(STATUS_CODES.CREATED)
      .send(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      ))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Введены некорректные данные'));
      }
      if (err.code === 11000) {
        return next(new ConflictError('Пользователь с такой почтой уже существует'));
      }
      return next(err);
    });
};

const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate({ _id }, { $set: { name, email } }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(STATUS_CODES.OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Введены некорректные данные при обновлении профиля'));
      }
      return next(err);
    });
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.status(STATUS_CODES.OK).send({ email: user.email, name: user.name });
      } else {
        next(new NotFoundError('Пользователь не найден'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Введены некорректные данные поиска'));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((next));
};

module.exports = {
  createUser,
  updateUserInfo,
  getUserInfo,
  login,
};