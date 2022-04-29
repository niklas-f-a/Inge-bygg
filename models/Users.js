const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ['admin', 'worker', 'client'],
    default: 'client',
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
  },
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hashSync(this.password, 10);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
