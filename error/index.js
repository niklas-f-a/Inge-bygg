class IngeError extends Error{}

class InvalidCredentials extends IngeError{
  constructor(){
    super()
    this.status = 403
    this.message = "Invalid Credentials"
  }
}

class Forbidden extends IngeError{
  constructor(){
    super()
    this.message = 'Unauthorized'
    this.status = 403
  }
}



module.exports = {
  IngeError,
  InvalidCredentials,
  Forbidden
}