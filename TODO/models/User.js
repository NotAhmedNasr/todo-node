const mongoose  = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String, 
    required: true, 
    minLength: 8,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true, 
    minLength: 3, 
    maxLength: 15
  },
  age: {
    type: Number,
  min: 13
  }
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User
}