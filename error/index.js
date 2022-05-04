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

class ImageError extends IngeError{
  constructor(status, message){
    super()
    this.message = message
    this.status = status
  }
}


module.exports = {
  IngeError,
  InvalidCredentials,
  Forbidden,
  ImageError
}