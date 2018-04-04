const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.connect('mongodb://localhost/test');


const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  favoriteTeam: String,
  isDeleted: Boolean
});



UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

let User = mongoose.model('User', UserSchema);

module.exports = User;

