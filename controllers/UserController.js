const User = require('../models/Users');
const bcrypt = require('bcryptjs');

module.exports = {
  async login(req, res, next) {
    try{
      const token = await User.authenticate(req.body)
      res.json({token})
    }catch(error){
      next(error)
    }
  },
};
