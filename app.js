const express = require('express')
const app = express()
require('dotenv').config()
const connection = require('./database/connection')



async function connect(){
  await connection()
  const PORT = process.env.PORT || 5001
  app.listen(PORT, ()=> console.log(`Running on ${PORT}`))
}
connect()



app.use(express.json())


