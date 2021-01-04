const express = require('express')
const { create, getFirstNames, update, deleteByID } = require('../controllers/user');
const { checkUser } = require('../middlewares/Auth');
const { signUser } = require('../middlewares/jwtToken');

const router = express.Router();

router.use(function (req, res, next) {
  next();
});

router.get('/', async (req, res, next) => {
  const names = await getFirstNames().catch(next)
  res.json(names);
});

router.post('/', async (req, res, next) => {
  let { body: user } = req;
  const userResult = await create(user).catch(next);
  user = userResult;
  next()
}, signUser);

router.post('/login', checkUser, signUser, (req, res, next) => {
  res.json(req.user);
});

router.patch('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { body:values } = req;
  const result = await update(id, values).catch(next);
  if (result) {
    res.send(result);
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  const result = await deleteByID(id).catch(next);
  if (result) {
    res.send(result);
  }
});

module.exports = {router};