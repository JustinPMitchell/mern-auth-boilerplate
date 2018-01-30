import React, { Component } from 'react';
import MealWrapper from './Meal/MealWrapper.js';

class Home extends Component {
  render(){
    return (
      <MealWrapper mealtype="Breakfast" />
      <MealWrapper mealtype="Lunch" />
      <MealWrapper mealtype="Dinner" />
      );
  }
}

export default Home;
