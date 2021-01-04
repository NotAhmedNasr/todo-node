const { Todo } = require('../models/Todo');

const create = async function (todo) {
  return await Todo.create(todo);
}

const getAll = async function () {
  return await Todo.find().exec();
}

const getByUser = async function (id) {
  return await Todo.find({ user_id: id }).exec();
}

const update = async function (id, values) {
  const { title = 0, status = 0, tags = 0, user_id } = values;
  const conditions = { _id: id, user_id: user_id },
    newValues = { title, status, tags }
  return await Todo.updateOne(conditions, newValues).exec();
}

const deleteByID = async function (id, user_id) {
  const conditions = { _id: id, user_id }
  return await Todo.deleteOne(conditions).exec();
}

module.exports = {
  create,
  getAll,
  getByUser,
  update,
  deleteByID
};
