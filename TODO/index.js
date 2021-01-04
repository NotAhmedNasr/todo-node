const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/TODO', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const { router:todosRouter } = require('./routes/todo');
const { router:usersRouter } = require('./routes/user');

const app = express();

app.use(express.json());
app.use('/todos', todosRouter);
app.use('/users', usersRouter);

app.use((error, req, res, next) => {
  return res.status(error.statusCode || 400).json({ error: error.toString() });
});

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`Application started on: localhost:${PORT}`)
});