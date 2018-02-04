import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class MealCreate extends Component {
  constructor(props){
    super(props);
    this.state = {
      health:[],
      diet:[],
      dailyCal:null
    }
  }
  handleFormSubmit = (e) =>{
    e.preventDefault();
    let user = this.props.user;
    let bmr = null;
    if(user.sex === "male"){
      bmr = 66 + ( 6.2 * user.weight ) + ( 12.7 * user.height * 12 ) - ( 6.76 * user.age || 25 );
    }else if(user.sex === "female"){
      bmr = 655.1 + ( 4.35 * user.weight ) + ( 4.7 * user.height * 12 ) - ( 4.7 * user.age || 25 );
    }else{
      console.log("need to redirect to settings page so they can update their information");
    }
  }
  handleDropdownChange = (e) =>{
    let elName = e.target.getAttribute("name");
    let sArr = this.state[elName];
    if(sArr.indexOf(e.target.value) < 0){
      //add item to state
      sArr.push(e.target.value);
      this.setState({[elName]:sArr});
    }else{
      //remove item from state
      this.setState({[elName]:sArr.splice(sArr.indexOf(e.target.value),1)});
    }
  }
  handleInputChange = (e) =>{
    //only take numbers as input
    this.setState({dailyCal:parseFloat(e.target.value.replace(/[^0-9.]/g, "")||0)});
  }
  render() {
    const user = this.props.user;
    if(user !== null && typeof user !== "undefined" && !(user._id)){
      return (
        <div>
          <form className="create-meal-form" onSubmit={this.handleFormSubmit}>
          <br />
          <hr />
          <br />
            <div className="diet-input-wrapper">
              <label className="diet-label">Diet Type : </label>
              <select onChange={this.handleDropdownChange} className="diet-dropdown" name="diet">
                <option value="balanced">Balanced</option>
                <option value="high-fiber">High-Fiber</option>
                <option value="high-protein">High-Protein</option>
                <option value="low-carb">Low-Carb</option>
                <option value="low-fat">Low-Fat</option>
                <option value="low-sodium">Low-Sodium</option>
              </select>
            </div>
            <br />
            <hr />
            <br />
            <div className="health-input-wrapper">
              <label className="health-label">Health & Diet Restrictions: </label>
              <select onChange={this.handleDropdownChange} className="health-dropdown" name="health">
                <option value="celery-free">Celery-free</option>
                <option value="crustacean-free">Crustacean-free</option>
                <option value="dairy-free">Dairy</option>
                <option value="egg-free">Eggs	</option>
                <option value="fish-free">Fish</option>
                <option value="gluten-free">Gluten</option>
                <option value="kidney-friendly">Kidney friendly</option>
                <option value="kosher">Kosher</option>
                <option value="low-potassium">Low potassium</option>
                <option value="lupine-free">Lupine-free</option>
                <option value="mustard-free	">Mustard-free</option>
                <option value="No-oil-added">No oil added</option>
                <option value="low-sugar">No-sugar</option>
                <option value="paleo">Paleo</option>
                <option value="peanut-free">Peanuts</option>
                <option value="pescatarian">Pescatarian</option>
                <option value="pork-free">Pork-free</option>
                <option value="red-meat-free">Red meat-free</option>
                <option value="sesame-free">Sesame-free</option>
                <option value="shellfish-free">Shellfish</option>
                <option value="soy-free">Soy</option>
                <option value="sugar-conscious">Sugar-conscious</option>
                <option value="tree-nut-free">Tree Nuts	</option>
                <option value="vegan">Vegan</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="wheat-free">Wheat-free</option>
              </select>
            </div>
            <br />
            <hr />
            <br />
            <div className="cal-burned-wrapper">
              <label className="cal-burned-label">Average calories burned a day from exercise : </label>
              <input onChange={this.handleInputChange} value={this.state.dailyCal} type="text" name="calFromExercise" className="cal-burned-input"/> 
            </div>
            
            <input type="submit" className="submit-meal-plan"/>
          </form>
        </div>
      );
    }else{
      //invalid user
      return(
        <Redirect to="/login"/>
      );
    }
  }
}

export default MealCreate;