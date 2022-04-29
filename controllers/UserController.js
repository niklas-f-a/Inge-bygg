const User = require('../models/Users');

module.exports = {

  async login(req, res, next) {
    try{
      const token = await User.authenticate(req.body)
      res.json({token})
    }catch(error){
      next(error)
    }
  },

  async register(req, res, next){
    try{
      const {name, email, password, role} = req.body
      const user = await User.create({name, email, password, role})
      res.status(201).json({
        message: 'User created',
        user: {
          id: user._id,
          name: name,
          email,
          role
        }
      })
    }catch(error){
      next(error)
    }
  }
};
