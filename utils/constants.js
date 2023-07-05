const STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
  };
  
  const MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb';
  
  const regexLink = /^https?:\/\/(www\.)?[a-zA-Z\0-9]+\.[\w\-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/;
  
  module.exports = { STATUS_CODES, MONGO_URL, regexLink };