const jwt = require('jsonwebtoken')
require('dotenv').config()
const {Forbidden} = require('../error')

const verify = (header, role) => {
  const token = header.replace('Bearer ', '')
  const user = jwt.verify(token, process.env.JWT_SECRET)
  if(user.role != role){
    throw new Forbidden
  }
  return user
}

module.exports = {
  client(req, res, next){
    const user = verify(req.headers.authorization, 'client')
    req.user = user
    next()
  },

  admin(req, res, next){
    const user = verify(req.headers.authorization, 'admin')
    req.user = user
    next()
  },

  worker(req, res, next){
    const user = verify(req.headers.authorization, 'worker')
    req.user = user
    next()
  }
}