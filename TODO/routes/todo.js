const express = require('express');
const { create, getAll, getByUser, update, deleteByID } = require('../controllers/todo');
const { getCurrentUserName } = require('../middlewares/Auth');

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.get('/', async (req, res, next) => {
  res.json(await getAll().catch(next));
});

router.get('/:id', async (req, res, next) => {
  const { id: user_id } = req.params;
  res.json(await getByUser(user_id).catch(next));
});

router.use(getCurrentUserName);

router.post('/', getCurrentUserName,async (req, res, next) => {
  const { body:todo } = req;
  const todoResult = await create(todo).catch(next);
  res.json(todoResult);
});

router.patch('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { body:todo } = req;
  const results =  await update(id, todo).catch(next);
  res.json(results)
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { body:todo } = req;
  const results = await deleteByID(id, todo.user_id).catch(next);
  res.json(results)
});

module.exports = {router};