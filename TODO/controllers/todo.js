const { Todo } = require('../models/Todo');

const create = async function (todo) {
  return await Todo.create(todo);
}

module.exports = {
  create
}