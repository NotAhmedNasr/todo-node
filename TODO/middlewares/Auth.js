const { User } = require('../models/User');
const jwt = require('jsonwebtoken');

// middleware that authenticates the user trying to log in
const checkUser = async function (req, res, next) {
  const { body: login } = req;
  const user = await User.findOne({ username: login.username }).exec();
  if (user === null) {
    return res.status(401).send("Invalid Username");
  }
  if (await user.validatePassword(login.password)) {
    req.user = user;
    return next();
  }
  return res.status(401).send("Invalid Password");
}

// middle ware to get the username from the token and add his id to the request body
const getCurrentUserName = function (req, res, next) {
  const { jwttoken } = req.headers;
  const { body } = req;
  jwt.verify(jwttoken, 'secret', async (err, decoded) => {
    if (err) {
      return next(err);
    }
    body.user_id = await getUserId(decoded.data.username).catch(next);
    next();
  });
}

// auxiliary function to get the id
const getUserId = async function (username) {
  const results =  await User.findOne({ username: username }, { _id: 1 }).exec();
  return results._id;
}

module.exports = {
  checkUser,
  getCurrentUserName
};