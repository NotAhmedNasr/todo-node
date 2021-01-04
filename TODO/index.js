// 1- Require express to initialise server and mongoose to connect to DB
const express = require('express');
const mongoose = require('mongoose');

// 2- connect to project DB
mongoose.connect('mongodb://localhost:27017/TODO', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

// 3- split the main routes into routers 
const { router:todosRouter } = require('./routes/todo');
const { router:usersRouter } = require('./routes/user');

// 4- call the express method to initialize the app object
const app = express();

// 5- use express.jsom middleware to parse the body 
app.use(express.json());

// 6- use main routers 
app.use('/todos', todosRouter);
app.use('/users', usersRouter);

// 7- main error handler in the web server
app.use((error, req, res, next) => {
  return res.status(error.statusCode || 400).json({ error: error.toString() });
});

// 8- initialize the port or get it from env variables
const { PORT = 3000 } = process.env;

// 9- start listening on the port
app.listen(PORT, () => {
  console.log(`Application started on: localhost:${PORT}`)
});