/********* '/users' Router **********/

const express = require('express')
const { create, getFirstNames, update, deleteByID } = require('../controllers/user');
const { checkUser } = require('../middlewares/Auth');
const { signUser } = require('../middlewares/jwtToken');

// initializing router "MUST use a middleware"
const router = express.Router();
router.use(function (req, res, next) {
  next();
});

// this will display uers first names
router.get('/', async (req, res, next) => {
  const names = await getFirstNames().catch(next)
  res.json(names);
});

// this will register a new user
router.post('/', async (req, res, next) => {
  let { body: user } = req;
  const userResult = await create(user).catch(next);
  user = userResult;
  next()
}, signUser);

// this will login a user
// middlewares used to authenticate and provide session token
router.post('/login', checkUser, signUser, (req, res, next) => {
  res.json(req.user);
});

// Will edit an existing user info
router.patch('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { body:values } = req;
  const result = await update(id, values).catch(next);
  if (result) {
    res.send(result);
  }
});

// Will delete a user
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  const result = await deleteByID(id).catch(next);
  if (result) {
    res.send(result);
  }
});

module.exports = {router};