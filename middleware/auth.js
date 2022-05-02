const req = require('express/lib/request');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Forbidden } = require('../error');

const verify = (header) => {
  const token = header.replace('Bearer ', '');
  const user = jwt.verify(token, process.env.JWT_SECRET);

  return user;
};

exports.authRoles = (rolesArr) => {
  return (req, res, next) => {
    const user = verify(req.headers.authorization);
    req.user = user;
    if (!rolesArr.includes(req.user.role)) {
      throw new Forbidden();
    }
    next();
  };
};
