/********* '/todos' Router **********/

const express = require('express');
const { create, getAll, getByUser, update, deleteByID } = require('../controllers/todo');
const { getCurrentUserName } = require('../middlewares/Auth');

// initializing router "MUST use a middleware"
const router = express.Router();
router.use((req, res, next) => {
  next();
});

// Will display all todos
router.get('/', async (req, res, next) => {
  res.json(await getAll().catch(next));
});

// will display specific user todos
router.get('/:id', async (req, res, next) => {
  const { id: user_id } = req.params;
  res.json(await getByUser(user_id).catch(next));
});

// this will initialize a session for the logged in user
router.use(getCurrentUserName);

// will create a new todo for the logged in user
router.post('/', getCurrentUserName,async (req, res, next) => {
  const { body:todo } = req;
  const todoResult = await create(todo).catch(next);
  res.json(todoResult);
});

// will edit a todo that belongs to the logged in user
router.patch('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { body:todo } = req;
  const results =  await update(id, todo).catch(next);
  res.json(results)
});

// will delete a todo that belongs to the logged in user
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { body:todo } = req;
  const results = await deleteByID(id, todo.user_id).catch(next);
  res.json(results)
});

module.exports = {router};