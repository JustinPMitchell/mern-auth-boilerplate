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
  //these don't need to be required
  height: {
    type: String,
    required: false
  },
  weight: {
    type: String,
    required: false
  },   
  sex: {
    type: String,
    required: false
  },
  //* add new data
  dob: {
    type: Date,
    required: false
  },
  exercise: {
    type: String,
    required: false
  },
  desire: {
    type: String,
    required: false
  },
  meals: {
    end: {
      type: String,
      required: false
    },
    //takes in the entire string of 21 meals
    mealdata: {
      type: String,
      required: false
    }
  }
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
      //* add to prevent password
      dob: ret.dob,
      exercise: ret.exercise,
      desire: ret.desire,
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
