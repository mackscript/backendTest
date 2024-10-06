const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'UserName is required.'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password is required.'],
    unique: true,
  },
});
const User = mongoose.model('User', userSchema);

module.exports = User;
