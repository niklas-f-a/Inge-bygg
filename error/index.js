class IngeError extends Error{}

class InvalidCredentials extends IngeError{
  constructor(){
    super()
    this.status = 403
    this.message = "Invalid Credentials"
  }
}



module.exports = {IngeError, InvalidCredentials}