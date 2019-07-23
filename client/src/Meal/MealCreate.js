import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class MealCreate extends Component {
  constructor(props){
    super(props);
    this.state = {
      health:'alcohol-free',
      diet:'balanced',
      dailyCal:null
    }
  }
  handleFormSubmit = (e) =>{
    const base = this;
    e.preventDefault();
    let user = this.props.user;
    let bmr = null;
    if(user.sex === "male"){
      //bmr = 66 + ( 6.2 * user.weight ) + ( 12.7 * user.height * 12 ) - ( 6.76 * user.age || 25 );
      bmr = 66.5 + ( 13.75 * user.weight ) + ( 5.003 * user.height ) - ( 6.755  * user.age || 25 );
    }else if(user.sex === "female"){
      //bmr = 655.1 + ( 4.35 * user.weight ) + ( 4.7 * user.height * 12 ) - ( 4.7 * user.age || 25 );
      bmr = 655.1 + ( 9.563 * user.weight ) + ( 1.850* user.height ) - ( 4.676 * user.age || 25 )
    }else{
      console.log("need to redirect to settings page so they can update their information");
    }
    const calFromWorkout = this.state.dailyCal;
    const dailyCal = bmr + calFromWorkout;
    const randomNum = (min, max) => {
      return Math.floor(Math.random() * max + min);
    };
    const days = this.props.dates;
    const reqMeals = {
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: [],
    };
    const mealPlan={
      mealData:[],
      expireDate: Date.now()+ (days.length * 86400000)
    };
    const getMeals=(search,appId,appKey,calRange,numResultsToDisplay,health,diet,reslv,tmr) => {
      let query = `q=${search}&app_id=${appId}&app_key=${appKey}&from=${numResultsToDisplay[0]}&to=${numResultsToDisplay[1]}&calories=gte${calRange[0]},lte${calRange[1]}&health=${health[0]}&diet=${diet}`;
      fetch('https://api.edamam.com/search?' + query)
        .then(result => {
          return result.json();
        })
        .then(res => {
          sortMealData(res.hits, health,search);
          reslv();
        })
        .catch(err => {
          if(tmr<15000 || typeof tmr === "undefined"){
            console.log("time to wait ", tmr||5000);
          setTimeout(function(){
            //handeling capped out api request.
            getMeals(
              search,
              appId,
              appKey,
              calRange,
              numResultsToDisplay,
              health,
              diet,
              reslv,
              tmr*1.5 || 5000*1.5
            )
          },tmr*1.5 || 5000);
          }else{
          console.log("catch timed out. switch api key");
          }
          console.log(err);
        });
    };
    const sortMealData = (mealData, health,s) => {
      let m;
      if (health.length > 1) {
        health.forEach(healthItem => {
          m = mealData.map(item => {
            if (item && item.recipe.healthLabels.indexOf(healthItem) !== -1) {
              return item;
            }
          });
        });
      } else {
        m = mealData;
      }
      generateMeals(m,s);
    };
    const generateMeals = (mealData,s) => {
      //randomizing mealdata
      for (let i = mealData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mealData[i], mealData[j]] = [mealData[j], mealData[i]];
      }
      while(reqMeals[s].length<days.length){
        reqMeals[s].push(mealData[0].recipe);
        mealData.shift();
      }
    };

    const buildMealReq = (meals) => {
      /*add snack later... (other 25%)*/
      let p = new Promise((resolve, reject) => {
        (async function loop() {
          for (let i = 0; i <meals.length; i++) {
            await new Promise((reslv) => {
              getMeals(
                meals[i],
                '0ab03e5f',
                '1d2082cd49bb105869f81757b0cb92fb',
                [parseInt(dailyCal * 0.25 - 100), parseInt(dailyCal * 0.25 + 50)],
                [0, 100],/*num items to be req*/
                [base.state.health],/*keep alcohol free & insert health restrictions after it.*/
                base.state.diet,/*diet type*/
                reslv //gets fired when request is finished.
              )
            });
          }
          resolve(reqMeals);
        })();
      });
      return p;
    };
    const handleFinalBuild = (meals) =>{
      const m = buildMealReq(meals);
      //fires once request has been complete.
      m.then( (res) => {
        switch(true){
          //handles missing items in api request.
          case res.breakfast.length !== days.length:
            console.log("missing breakfast");
            handleFinalBuild(["breakfast"]);
          break;
          case res.lunch.length !== days.length:
            console.log("missing lunch");
            handleFinalBuild(["lunch"]);
          break;
          case res.dinner.length !== days.length:
            console.log("missing dinner");
            handleFinalBuild(["dinner"]);
          break;
          default:
            //console.log("all items were requested",res);
            //creating meal plan;
            for(let i=0;i<days.length;i++){
              mealPlan.mealData.push({
                day:days[i],
                breakfast:{
                  name:reqMeals.breakfast[i].label,
                  image:reqMeals.breakfast[i].image,
                  servings:reqMeals.breakfast[i].yield,
                  calories:reqMeals.breakfast[i].calories,
                  healthLabels:reqMeals.breakfast[i].healthLabels,
                  ingredients:reqMeals.breakfast[i].ingredientLines,
                  nutrition:reqMeals.breakfast[i].digest
                },
                  lunch:{
                  name:reqMeals.lunch[i].label,
                  image:reqMeals.lunch[i].image,
                  servings:reqMeals.lunch[i].yield,
                  calories:reqMeals.lunch[i].calories,
                  healthLabels:reqMeals.lunch[i].healthLabels,
                  ingredients:reqMeals.lunch[i].ingredientLines,
                  nutrition:reqMeals.lunch[i].digest
                },
                  dinner:{
                  name:reqMeals.dinner[i].label,
                  image:reqMeals.dinner[i].image,
                  servings:reqMeals.dinner[i].yield,
                  calories:reqMeals.dinner[i].calories,
                  healthLabels:reqMeals.dinner[i].healthLabels,
                  ingredients:reqMeals.dinner[i].ingredientLines,
                  nutrition:reqMeals.dinner[i].digest
                }
              });
            }
            axios.post("/settings/addmealplan", {      
              userId:this.props.user.id,
              mealData:mealPlan,
              end:mealPlan.expireDate 
            })
            .then((result) => {
              console.log(result);
              window.location.href="/";
            });
          break;
        }
      })
      .catch((err) => {
        console.log("error pulling data from food api",err);
      });
      }
      handleFinalBuild(["breakfast","lunch","dinner"]);
  }
  handleInputChange = (e) =>{
    //only take numbers as input
    this.setState({dailyCal:parseInt(e.target.value.replace(/[^0-9.]/g, "")||0)});
  }
  handleDropdownChange = (e) =>{
    /* CODE FOR HANDLING ITEMS AS AN ARRAY ( MULTIPLE ITEM CHOICES ) */
    // let elName = e.target.getAttribute("name");
    // let sArr = this.state[elName];
    // if(sArr.indexOf(e.target.value) < 0){
    //   //add item to state
    //   sArr.push(e.target.value);
    //   this.setState({[elName]:sArr});
    // }else{
    //   //remove item from state
    //   this.setState({[elName]:sArr.splice(sArr.indexOf(e.target.value),1)});
    // }
    /* Code for handling single item selections */ 
    let elName = e.target.getAttribute("name");
    this.setState({[elName]:e.target.value});
    console.log(this.state.diet,"/ ",this.state.health);
  }
  render() {
    const user = this.props.user;
    if(user !== null && typeof user !== "undefined"){
      return (
        <div>
          <form className="create-meal-form" onSubmit={this.handleFormSubmit}>
          <div className="create-meal-plan-title">Create Meal Plan</div>
          <br />
          <hr />
          <br />
            <div className="diet-input-wrapper">
              <label className="diet-label">Diet Type : </label>
              <select onChange={this.handleDropdownChange} value={this.state.diet} className="diet-dropdown" name="diet">
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
              <select onChange={this.handleDropdownChange} value={this.state.health} className="health-dropdown" name="health">
                <option value="alcohol-free">Alcohol-free</option>
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
              <label className="cal-burned-label">Calories Burned a Day : </label>
              <input onChange={this.handleInputChange} value={this.state.dailyCal} type="text" name="calFromExercise" className="cal-burned-input"/> 
            </div>
            <br />
            <hr />
            <br />
            <input type="submit" className="submit-meal-plan" value="Create Plan"/>
          </form>
        </div>
      );
    }else{
      //invalid user
      return(
        <Redirect to="/"/>
      );
    }
  }
}

export default MealCreate;