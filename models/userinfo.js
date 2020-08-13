const mongoose = require('mongoose');

const UserInfoSchema = new mongoose.Schema({
  name: {type: String, unique: true, trim: true, lowercase: true},
  email: {type: String, unique: true, trim: true, lowercase: true},
  password: String,
  entries: {type: Number, default: 0},
  token: String
});

module.exports = mongoose.model('UserInfo', UserInfoSchema);
