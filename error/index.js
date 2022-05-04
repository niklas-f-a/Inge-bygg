class IngeError extends Error {}

class InvalidCredentials extends IngeError {
  constructor() {
    super();
    this.status = 403;
    this.message = 'Invalid Credentials';
  }
}

class MissingCredentials extends IngeError {
  constructor(...arr) {
    super();
    this.status = 400;
    this.message = `Missing credentials: ${arr.join(', ')} required`;
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
    this.message = 404;
    this.status = `${payload} not found.`;
  }
}

class ImageError extends IngeError {
  constructor(status, message) {
    super();
    this.message = message;
    this.status = status;
  }
}

module.exports = {
  IngeError,
  InvalidCredentials,
  MissingCredentials,
  Forbidden,
  ResourceNotFound,
  ImageError,
};
