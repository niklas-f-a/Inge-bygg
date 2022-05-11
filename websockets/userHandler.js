const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {

  authenticate: (token) => {
    return jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if(error){
        throw new Error('Invalid credentials')
      }else{
        return decoded
      }
    })
  },

  getDate: () => {
    return new Date().toISOString()
  }


}