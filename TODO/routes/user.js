const express = require('express')
const { create } = require('../controllers/user');

const router = express.Router()

router.use(function timeLog (req, res, next) {
  next()
})

router.get('/', (req, res, next) => {
  res.send('hello from users get')
})
router.post('/', async (req, res, next) => {
  const { body:user } = req;
  const userResult = await create(user).catch(next);
  res.json(userResult);
})
router.post('/login', (req, res, next) => {
  res.send('hello from users/login post')
})
router.patch('/', (req, res, next) => {
  res.send('hello from users patch')
})
router.delete('/', (req, res, next) => {
  res.send('hello from users delete')
})

module.exports = router