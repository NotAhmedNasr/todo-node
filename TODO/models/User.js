const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

userSchema.methods.validatePassword = async function (loginPassword) {
  return await bcrypt.compare(loginPassword, this.password);
};
const User = mongoose.model('User', userSchema);

module.exports = {
  User
};