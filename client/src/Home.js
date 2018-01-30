import React, { Component } from 'react';
import MealWrapper from './Meal/MealWrapper.js';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      mealPlan : [{
        day:"Sunday",
        meals:[{
          type:"befast",
          name:"cereal",
          cal:290,
          ingredients:"milk and wheat"
        },{
          type:"lunch",
          name:"sandwich",
          cal:390,
          ingredients:"ham and turkey"
        },{
          type:"dinner",
          name:"steak",
          cal:840,
          ingredients:"t-bone steak"
        }],
        date:"1/30/2018"
      },{
        day:"Monday",
        meals:[{
          type:"breakfast",
          name:"cereal",
          cal:290,
          ingredients:"milk and wheat"
        },{
          type:"lunch",
          name:"sandwich",
          cal:390,
          ingredients:"ham and turkey"
        },{
          type:"dinner",
          name:"steak",
          cal:840,
          ingredients:"t-bone steak"
        }],
        date:"2/1/2018"
      },{
        day:"Tuesday",
        meals:[{
          type:"breakfast",
          name:"cereal",
          cal:290,
          ingredients:"milk and wheat"
        },{
          type:"lunch",
          name:"sandwich",
          cal:390,
          ingredients:"ham and turkey"
        },{
          type:"blinner",
          name:"steak",
          cal:840,
          ingredients:"t-bone steak"
        }],
        date:"2/2/2018"
      },{
        day:"Wednesday",
        meals:[{
          type:"breakfast",
          name:"cereal",
          cal:290,
          ingredients:"milk and wheat"
        },{
          type:"lunch",
          name:"sandwich",
          cal:390,
          ingredients:"ham and turkey"
        },{
          type:"dinner",
          name:"steak",
          cal:840,
          ingredients:"t-bone steak"
        }],
        date:"2/3/2018"
      },{
        day:"Thursday",
        meals:[{
          type:"breakfast",
          name:"cereal",
          cal:290,
          ingredients:"milk and wheat"
        },{
          type:"brunch",
          name:"sandwich",
          cal:390,
          ingredients:"ham and turkey"
        },{
          type:"dinner",
          name:"steak",
          cal:840,
          ingredients:"t-bone steak"
        }],
        date:"2/4/2018"
      },{
        day:"Friday",
        meals:[{
          type:"breakfast",
          name:"cereal",
          cal:290,
          ingredients:"milk and wheat"
        },{
          type:"lunch",
          name:"sandwich",
          cal:390,
          ingredients:"ham and turkey"
        },{
          type:"dinner",
          name:"steak",
          cal:840,
          ingredients:"t-bone steak"
        }],
        date:"2/5/2018"
      },{
        day:"Saturday",
        meals:[{
          type:"breakfast",
          name:"cereal",
          cal:290,
          ingredients:"milk and wheat"
        },{
          type:"lunch",
          name:"sandwich",
          cal:390,
          ingredients:"ham and turkey"
        },{
          type:"dinner",
          name:"steak",
          cal:840,
          ingredients:"t-bone steak"
        }],
        date:"2/6/2018"
      }]
    }
  }
  render(){
    let mealPlanData = this.state.mealPlan.find(x => x.day === this.props.currentDate);
    mealPlanData = mealPlanData.meals.map((meal)=>{
      return (
        <MealWrapper mealType={meal.type} mealName={meal.name} mealCal={meal.cal} mealIngredients={meal.ingredients} />
      );
    });
    return (
      <div className="meal-item-container">
        {mealPlanData}
      </div>
      );
  }
}

export default Home;
