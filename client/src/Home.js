import React, { Component } from 'react';
import MealWrapper from './Meal/MealWrapper.js';

class Home extends Component {
  render(){
    return (
      <div className="meal-item-container">
        <MealWrapper mealtype="Breakfast" />
        <MealWrapper mealtype="Lunch" />
        <MealWrapper mealtype="Dinner" />
      </div>
      );
  }
}

export default Home;
