const express = require('express');
const app = express();
const errorHandler = require('./middleware/errorHandler')
const routes = require('./routes')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use('/users', routes.users);
app.use('/tasks', routes.tasks);

app.use(errorHandler)
app.use(routes._404)



module.exports = app
