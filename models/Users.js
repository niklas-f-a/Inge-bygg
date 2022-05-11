const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const {InvalidCredentials, TokenExpired} = require('../error')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
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
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

userSchema.static("authenticate", async function({email, password}){
  const user = await this.findOne({ email }).select('+password');
  if(!user){
    throw new InvalidCredentials
  }
  const passwordMatch = bcrypt.compareSync(password, user.password)
  if(passwordMatch){
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES})
  }else{
    throw new InvalidCredentials
  }
})

userSchema.static('verify', function(header){
  const token = header.replace('Bearer ', '');
  return jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if(error instanceof jwt.TokenExpiredError){
      throw new TokenExpired()
    }else if(error){
      throw new Error()
    }else{
      return decoded
    }
  })
})



const User = mongoose.model('User', userSchema);

module.exports = User;
