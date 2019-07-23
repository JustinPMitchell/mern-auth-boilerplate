import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import MealWrapper from './Meal/MealWrapper.js';
import WoodBackground from './images/WoodBackground.jpg';
import logo from './images/pineapple.png';
import Login from './auth/Login';
import MealCreate from './Meal/MealCreate.js';


class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      user : this.props.user
    }
  }

  componentDidMount() {
    document.getElementsByClassName("mobile-nav")[0].style.display = "none";
    if(this.props.user !== null && typeof this.state.user !== "undefined" && typeof this.state.user.meals !== "undefined") {
      document.getElementsByClassName("mobile-nav")[0].style.display = "block";
    }
  }

  render(){
    if(this.props.user !== null && typeof this.state.user !== "undefined" && typeof this.state.user.meals !== "undefined"){
      let data = JSON.parse(this.state.user.meals.mealdata);
      data = data.mealData.find(x => x.day === this.props.currentDate);
      console.log("meal plan created");
      return (
        <div className="meal-item-container">
          <div className="meal-list-container">
            <div className="meal-plan-title">Meal Plan</div>
            <br></br>
            <hr></hr>
            <br></br>
            <MealWrapper img={data.breakfast.image} mealType={"Breakfast"} mealName={data.breakfast.name} mealCal={data.breakfast.calories} mealIngredients={data.breakfast.ingredients} />
            <MealWrapper img={data.lunch.image} mealType={"Lunch"} mealName={data.lunch.name} mealCal={data.lunch.calories} mealIngredients={data.lunch.ingredients} />
            <MealWrapper img={data.dinner.image} mealType={"Dinner"} mealName={data.dinner.name} mealCal={data.dinner.calories} mealIngredients={data.dinner.ingredients} />
          </div>
        </div>
      );
    }else if(this.props.user !== null) {
      console.log("create your meal plan");
      return (
        <div>
          <Redirect to="/mealcreate" />
        </div>
      );
    }else{
      console.log("handle no meal data");
      console.log("this is the user by state", this.state.user);
      console.log("this is the user by props", this.props.user);
      return (
        <div className="meal-item-container">
          <img className="title-background" src={WoodBackground}></img>
          <div className="logo-title-image-wrapper">
            <img className="logo-title-image" src={logo}></img>
          </div>
          <div className="logo-title">Chomper</div>
          <div className="login-wrapper">
            <Login setFlash={this.props.setFlash} updateUser={this.props.updateUser} />
          </div>
        </div>
      );
    }
  }
}

export default Home;
