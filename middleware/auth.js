const User = require('../models/Users')
require('dotenv').config();
const { Forbidden } = require('../error');



module.exports.authRoles = rolesArr => {
  return (req, res, next) => {
    const user = User.verify(req.headers.authorization);
    req.user = user;
    if (!rolesArr.includes(req.user.role)) {
      throw new Forbidden();
    }
    next();
  };
};
