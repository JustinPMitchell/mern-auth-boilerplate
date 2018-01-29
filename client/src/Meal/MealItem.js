import React, { Component } from 'react';
import MealDate from './MealDate.js';
import MealTitle from './MealTitle.js';
import MealDescription from './MealDescription.js';

class MealItem extends Component {
  render() {
    return (
      <div className="meal-item">
        <MealDate />
        <MealTitle />
        <MealDescription />
      </div>
    );
  }
}

export default MealItem;