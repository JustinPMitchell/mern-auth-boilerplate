var mongoose = require('mongoose');
// import User from './user.js';


var mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  calories: {
    type: String,
    required: false
  },
  protein: {
    type: String,
    required: false
  },
  user: [{
    type: String,
    required: false
  }]
});

// Override 'toJSON' to prevent the password from being returned with the user
mealSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    var returnJson = {
      name: ret.name,
      calories: ret.calories,
      protein: ret.protein,
      user: ret.user
    };
    return returnJson;
  }
});


var Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;