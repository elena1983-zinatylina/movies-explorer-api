const { celebrate, Joi } = require('celebrate');
const { regexLink } = require('../utils/constants');

const userInfoValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});

const signinValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const signupValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    name: Joi.string().required().min(2).max(30),
  }),
});

const addMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(regexLink).uri({ scheme: ['http', 'https'] }).required(),
    trailerLink: Joi.string().pattern(regexLink).uri({ scheme: ['http', 'https'] }).required(),
    thumbnail: Joi.string().pattern(regexLink).uri({ scheme: ['http', 'https'] }).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const movieIdValidator = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().required().length(24),
  }),
});

module.exports = {
  userInfoValidator,
  signinValidator,
  signupValidator,
  addMovieValidator,
  movieIdValidator,
};