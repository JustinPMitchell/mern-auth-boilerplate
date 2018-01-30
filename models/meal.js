var mongoose = require('mongoose');
// import User from './user.js';

var mealSchema = new mongoose.Schema({
  //takes in starting period
  start: [{
    type: String,
    required: false
  }],
  //takes in ending period
  end: [{
    type: String,
    required: false
  }],
  //takes in the entire string of 21 meals
  mealdata: [{
    type: String,
    required: false
  }],
  //takes in current user
  user: [{
    type: String,
    required: false
  }]
});

// Override 'toJSON' to prevent the password from being returned with the user
mealSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    var returnJson = {
      id: ret._id,
      start: ret.start,
      end: ret.end,
      mealdata: ret.mealdata,
      user: ret.user
    };
    return returnJson;
  }
});


var Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;