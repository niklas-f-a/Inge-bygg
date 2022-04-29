const express = require('express')
const app = express()
require('dotenv').config()
const connection = require('./database/connection')
const taskRouter = require('./routes/tasks')
const userRouter = require('./routes/users')



async function connect(){
  await connection()
  const PORT = process.env.PORT || 5001
  app.listen(PORT, ()=> console.log(`Running on ${PORT}`))
}
connect()


app.use('/users', userRouter)
app.use('/tasks', taskRouter)



app.use(express.json())


