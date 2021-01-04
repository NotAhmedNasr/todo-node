const { User } = require('../models/User');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const create = async function (user) {
  user.password = bcrypt.hashSync(user.password, salt);
  return await User.create(user);
}

const getFirstNames = async function () {  
  return await User.find({}, {_id:0, firstName: 1}).exec();
}

const update = async function (id, values) {
  const { firstName: fn, age: ag, password: psw } = values;
  const conditions = {_id: id},
    newValues = {
      firstName: fn || firstName,
      age: ag || age,
      password: psw ? bcrypt.hashSync(psw, salt) : password
    }
  return await User.updateOne(conditions, newValues).exec();
}

const deleteByID = async function (id) {  
  const conditions = {_id: id}
  return await User.deleteOne(conditions).exec();
}

module.exports = {
  create,
  getFirstNames,
  update,
  deleteByID
};