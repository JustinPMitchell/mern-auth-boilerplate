import React, { Component } from 'react';
import MealDate from './MealDate.js';
import MealTitle from './MealTitle.js';
import MealDescription from './MealDescription.js';

class MealItem extends Component {
  render() {
    return (
      <div className="meal-item">
        <MealDate img={this.props.img} />
        <MealTitle mealName={this.props.mealName} />
        <MealDescription mealCal={this.props.mealCal} mealIngredients={this.props.mealIngredients} />
      </div>
    );
  }
}

export default MealItem;