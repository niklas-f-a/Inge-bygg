const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Forbidden, TokenExpired } = require('../error');

const verify = (header) => {
  const token = header.replace('Bearer ', '');
  const user = jwt.verify(token, process.env.JWT_SECRET, (error) => {
    if(error instanceof jwt.TokenExpiredError){
      throw new TokenExpired()
    }else{
      throw new Error()
    }
  });
  return user;
};

module.exports.authRoles = (rolesArr) => {
  return (req, res, next) => {
    const user = verify(req.headers.authorization);
    req.user = user;
    if (!rolesArr.includes(req.user.role)) {
      throw new Forbidden();
    }
    next();
  };
};
