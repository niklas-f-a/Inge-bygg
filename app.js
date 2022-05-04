require('dotenv').config();
const express = require('express');
const app = express();
const errorHandler = require('./middleware/errorHandler')
const routes = require('./routes')


const connection = require('./database/connection');

async function connect() {
  try{
    await connection();
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`Running on ${PORT}`));
  }catch(error){
    console.log(error);
  }
}
connect();

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use('/users', routes.users);
app.use('/tasks', routes.tasks);

app.use(errorHandler)
app.use(routes._404)
