const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {

  authenticate(token){
    return jwt.verify(token, process.env.JWT_SECRET)
  }


}