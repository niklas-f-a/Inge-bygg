class IngeError extends Error {}

class InvalidCredentials extends IngeError {
  constructor() {
    super();
    this.status = 403;
    this.message = 'Invalid Credentials';
  }
}

class Forbidden extends IngeError {
  constructor() {
    super();
    this.message = 'Unauthorized';
    this.status = 403;
  }
}

class ResourceNotFound extends IngeError {
  constructor(payload) {
    super();
    this.status = 404;
    this.message = `${payload} not found.`;
  }
}

class ImageError extends IngeError {
  constructor(status, message) {
    super();
    this.message = message;
    this.status = status;
  }
}

class TokenExpired extends IngeError{
  constructor(){
    super()
    this.message = 'Token expired. Please login again'
    this.status = 401
  }
}

module.exports = {
  IngeError,
  InvalidCredentials,
  Forbidden,
  ResourceNotFound,
  ImageError,
  TokenExpired
};
