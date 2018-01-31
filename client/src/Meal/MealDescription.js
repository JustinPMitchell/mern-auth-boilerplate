import React, { Component } from 'react';


class MealDescription extends Component {
  render() {
    return (
      <div className="meal-description-wrapper">
        <form  action="SAVE ROUTE HERE" method="POST">
          <input value="Save" type="submit" class="save-meal-btn" />
        </form>
        <p className="meal-description">
          Calories : {this.props.mealCal},
          <br />
          Ingredients : {this.props.mealIngredients}
        </p>
      </div>
    );
  }
}

export default MealDescription;