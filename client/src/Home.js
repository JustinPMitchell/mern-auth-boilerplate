import React, { Component } from 'react';
import MealWrapper from './Meal/MealWrapper.js';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      user : this.props.user
    }
  }
  render(){
    if(this.props.user !== null && typeof this.state.user !== "undefined" && typeof this.state.user.meals !== "undefined"){
      let data = JSON.parse(this.state.user.meals.mealdata);
      data = data.mealData.find(x => x.day === this.props.currentDate);
      return (
        <div className="meal-item-container">
            <MealWrapper img={data.breakfast.image} mealType={"Breakfast"} mealName={data.breakfast.name} mealCal={data.breakfast.calories} mealIngredients={data.breakfast.ingredients} />
            <MealWrapper img={data.lunch.image} mealType={"Lunch"} mealName={data.lunch.name} mealCal={data.lunch.calories} mealIngredients={data.lunch.ingredients} />
            <MealWrapper img={data.dinner.image} mealType={"Dinner"} mealName={data.dinner.name} mealCal={data.dinner.calories} mealIngredients={data.dinner.ingredients} />
        </div>
      );
    }else{
      console.log("handle no meal data");
      return (
        <div className="meal-item-container">
          Create meal plan
        </div>
      );
    }
  }
}

export default Home;
