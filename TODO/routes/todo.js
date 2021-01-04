const express = require('express');
const { create } = require('../controllers/todo');

const router = express.Router()

router.use(function timeLog (req, res, next) {
  next()
})

router.get('/', (req, res, next) => {
  res.send('hello from todos get')
})
router.get('/', (req, res, next) => {
  res.send('hello from todos post')
})
router.post('/', async (req, res, next) => {
  const { body:todo } = req
  const todoResult = await create(todo).catch(next);
  res.json(todoResult);
})
router.patch('/:id', (req, res, next) => {
  res.send('hello from todos patch')
})
router.delete('/:id', (req, res, next) => {
  res.send('hello from todos delete')
})

module.exports = router