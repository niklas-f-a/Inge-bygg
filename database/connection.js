const mongoose = require('mongoose')
require('dotenv').config()


module.exports = async () => {
  try{
    await mongoose.connect(process.env.DATABASE_URL)
    console.log('connected to database');
  }catch(error){
    console.log(error);
  }
}