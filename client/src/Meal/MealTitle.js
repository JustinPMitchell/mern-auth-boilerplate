import React, { Component } from 'react';


class MealTitle extends Component {
  render() {
    return (
      <div className="meal-title-wrapper">
        <h1>
          {this.props.mealName}
        </h1>
        <div className="change-meal-btn">Change Meal</div>
        <div className="meal-info-btn">Info</div>
      </div>
    );
  }
}

export default MealTitle;