import React, { Component } from 'react';
import MealWrapper from './Meal/MealWrapper.js';

class Profile extends Component {
  render(){
    if(this.props.user && this.props.user.name){
      return (<div>
          <MealWrapper mealtype="Breakfast" />
          <MealWrapper mealtype="Lunch" />
          <MealWrapper mealtype="Dinner" />
        </div>);
    }
    else {
      return (<p>This is a profile page. You need to be logged in to view it.</p>);
    }
  }
}

export default Profile;