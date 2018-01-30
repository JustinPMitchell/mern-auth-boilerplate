var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 99
  },
  email: { // TODO: Need to add email validation
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 99
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 99
  },
  height: {
    type: String,
    required: true
  },
  weight: {
    type: String,
    required: true
  },   
  sex: {
    type: String,
    required: true
  },
  meals: [{
    type: mongoose.Schema.Types.ObjectId,  //REFERENCING :D
    ref: 'Meal'
  }]
});

// Override 'toJSON' to prevent the password from being returned with the user
userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    var returnJson = {
      id: ret._id,
      email: ret.email,
      name: ret.name,
      height: ret.height,
      weight: ret.weight,
      sex: ret.sex,
      meals: ret.meals
    };
    return returnJson;
  }
});

userSchema.methods.authenticated = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, res) {
    if (err) {
      callback(err);
    } else {
      callback(null, res ? this : false);
    }
  });
}

// Mongoose's version of a beforeCreate hook
userSchema.pre('save', function(next) {
  var hash = bcrypt.hashSync(this.password, 10);
  // store the hash as the user's password
  this.password = hash;
  next();
});

var User = mongoose.model('User', userSchema);

module.exports = User;
