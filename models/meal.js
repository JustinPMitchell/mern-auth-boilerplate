var mongoose = require('mongoose');
// import User from './user.js';

var mealSchema = new mongoose.Schema({
  //takes in ending period
  end: {
    type: String,
    required: true
  },
  //takes in the entire string of 21 meals
  mealdata: {
    type: String,
    required: true
  },
  //takes in current user
  userId: {
    type: String,
    required: true
  }
});

// Override 'toJSON' to prevent the password from being returned with the user
mealSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    var returnJson = {
      id: ret._id,
      end: ret.end,
      mealdata: ret.mealdata,
      userId: ret.userId
    };
    return returnJson;
  }
});


var Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;