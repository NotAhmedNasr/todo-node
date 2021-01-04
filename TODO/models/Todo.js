const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 20
  },
  status: {
    type: String,
    default: 'to-do'
  },
  tags: [{
    type: String,
    maxLength: 10
  }]
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);

module.exports = {
  Todo
};