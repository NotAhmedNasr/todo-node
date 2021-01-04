const {User} = require('../models/User');

const create = async function (user) {
  return await User.create(user);
}

module.exports = {
  create
}