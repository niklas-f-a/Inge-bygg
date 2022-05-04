const mongoose = require('mongoose');
const { IngeError } = require('../error');

module.exports = (error, req, res, next) => {
  console.log(req.method, req.path, error.status, error.message);
  if (error instanceof mongoose.CastError) {
    res.status(400).json({ error });
  } else if (error instanceof IngeError) {
    res.status(error.status).json({ error: error.message });
  } else {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
