import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import HeartRate from './Profile/HeartRate.js'

//images
import add from './images/add.svg';
import settings from './images/settings.svg';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      meals: [],
      bmr: 0,
      calorie: 0,
      carbs: 0,
      protein: 0,
      fat: 0,
      age: 0
    }
  }


  componentDidMount = () => {
    axios.get('/api/meal')
      .then(res => {
        this.setState({ meals: res.data });
      })
    var that = this;
    console.log(that.state.meals);



    var calculateBmr = () => {

      function calculateAge() { // dob is a date
        console.log(that.props.user);
        var dob = new Date(that.props.user.dob);
        var ageDifMs = Date.now() - dob.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      }
      
      var age = calculateAge();
      this.setState({ age: age });      

      var bmr = 0;
      if(this.props.user.sex === 'male') {
        bmr = 66.47 + (13.7 * this.props.user.weight) + (5 * this.props.user.height) - (6.8 * age);
        this.setState({ bmr: bmr });
      }else if(this.props.user.sex === 'female') {
        bmr = 655.1 + (9.6 * this.props.user.weight) + (1.8 * this.props.user.height) - (4.7 * age);
        this.setState({ bmr: bmr });      
      }else {
        bmr = ((66.47 + (13.7 * this.props.user.weight) + (5 * this.props.user.height) - (6.8 * age)) + (655.1 + (9.6 * this.props.user.weight) + (1.8 * this.props.user.height) - (4.7 * age))) / 2;
        this.setState({ bmr: bmr });      
      }
      return bmr;
    }

    var calculateCalorie = (bmr) => {
      if(this.props.user.exercise === 'not at all') {
        bmr *= 1.2;
      } else if(this.props.user.exercise === 'little') {
        bmr *= 1.375;
      } else if(this.props.user.exercise === 'moderate') {
        bmr *= 1.55;
      } else if(this.props.user.exercise === 'active') {
        bmr *= 1.725;
      } else if(this.props.user.exercise === 'extra active') {
        bmr *= 1.9;
      } else {
        bmr *= 1.375;
      }
      if(this.props.user.desire === 'fat loss') {
        bmr *= .90;
        this.setState({ calorie: bmr });
        this.setState({ carbs: (bmr * .17) / 4 });
        this.setState({ protein: (bmr * .47) / 4 });
        this.setState({ fat: (bmr * .27) / 9 });
      } else if(this.props.user.desire === 'build muscle') {
        bmr *= 1.10;
        this.setState({ calorie: bmr });
        this.setState({ carbs: (bmr * .37) / 4 });
        this.setState({ protein: (bmr * .32) / 4 });
        this.setState({ fat: (bmr * .22) / 9 });
      } else {
        bmr *= 1;
        this.setState({ calorie: bmr });
        this.setState({ carbs: (bmr * .37) / 4 });
        this.setState({ protein: (bmr * .37) / 4 });
        this.setState({ fat: (bmr * .17) / 9 });
      }
      return bmr;
    }

    calculateCalorie(calculateBmr());

  }

  delete(id){
    axios.delete('/api/meal/'+id)
      .then((result) => {

      });
  }

  render(){
    var that = this;
    if(this.props.user && this.props.user.name){
      return (
        <div className='Profile'>
          <div className="profile-picture-buttons-wrapper">
            <a href="/settings" className="profile-button">
              <img className="settings" src={settings}></img>
            </a>
            <div className="profile-picture-wrapper">
              <img className="profile-picture" src="https://www.alitumbas.av.tr/uploads/empty-profile-picture-woman.jpg"></img>
            </div>
            <a href="/mealcreate" className="profile-button">
              <img className="add" src={add}></img>
            </a>
          </div>
          <h2>{this.props.user.name}</h2>   
          <hr/>      
          <h4 className="profile-title">Your BMR: { Math.round(this.state.bmr) } calories</h4>
          <p>an estimate of the amount of calories your body can burn at rest: </p>
          <a href="https://www.diabetes.co.uk/bmr-calculator.html">BMR</a>
          <h4>Recommendended Intake: { Math.round(this.state.calorie) } calories</h4>
          <hr/>
          <h2 className="profile-title">Macros</h2>
          <p>the main nutrients that make up the food we eat: </p>
          <a href="http://www.kylehuntfitness.com/how-to-calculate-calorie-and-macronutrient-requirements/">Macronutrients</a>
          <table class="table table-stripe">
            <thead>
              <tr>
                <th>
                  <div className="macro-header">
                    Carbs  
                  </div>
                  <div className="macro-content"><br/>
                    <h1>{ Math.round(this.state.carbs) }g</h1><br/>
                    <h4>carb intake</h4><br/>
{/*                    counld light these up when someone is within the recc.
*/}                 <h2>Goals</h2>
                    <div className="macro-count">
                      <p>Fill your plate with healthy carbs, including leafy greans, whole grains and root veggies. A few good picks: broccoli, asparagus, cauliflower, squash, dark leafy greens, green beans, onions, cucumbers, oatmeal, sweet potatoes, potatoes and quinoa.</p>
                    </div>
                  </div>
                </th>
                <th>
                  <div className="macro-header">
                    Protein  
                  </div>
                  <div className="macro-content"><br/>
                    <h1>{ Math.round(this.state.protein) }g</h1><br/>
                    <h4>protein intake</h4><br/>
{/*                    counld light these up when someone is within the recc.
*/}                 <h2>Goals</h2>
                    <div className="macro-count">
                      <p>You need plenty of protein but don’t go crazy ordering greasy burgers and wings. Instead, choose: fatty fish (salmon, mackerel, herring), cod, lean grass-fed beef, turkey, eggs and nuts.</p>
                    </div>
                  </div>
                </th>
                <th>
                  <div className="macro-header">
                    Fat  
                  </div>
                  <div className="macro-content"><br/>
                    <h1>{ Math.round(this.state.fat) }g</h1><br/>
                    <h4>fat intake</h4><br/>
{/*                    counld light these up when someone is within the recc.
*/}                 <h2>Goals</h2>
                    <div className="macro-count">
                      <p>Getting plenty of healthy fats is important for healthy hormone levels, metabolism, mood vitamin absorption. Foods high in essential fatty acids include: coconut oil, olive oil, avocado, almonds, brazil nuts and macadamia nuts.</p>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
          </table>
{/*          <hr/>*/}
{/* Table for adding information to the database, just here for testing, does not need to be here forever, or could be?? */}
{/*          // <table class="table table-stripe">
          //   <thead>
          //     <tr>
          //       <th>Start</th>
          //       <th>End</th>
          //       <th>Metadata</th>
          //       <th>Delete</th>
          //       <th>Edit</th>
          //     </tr>
          //   </thead>
          //   <tbody>
          //     {this.state.meals.map(meal => {
          //       if(meal.user == that.props.user.email) {
          //         return (
          //           <tr>
          //             <td>{meal.start}</td>
          //             <td>{meal.end}</td>
          //             <td>{meal.mealdata}</td>
          //             <td><button onClick={that.delete.bind(that, meal.id)} class="btn btn-danger">Delete</button></td>
          //             <td><Link to={`/edit/${meal.id}`} class="btn btn-success">Edit</Link>&nbsp;</td>
          //           </tr>
          //         )
          //       }
          //     })}
          //   </tbody>
          // </table>*/}
          <hr/>
          <HeartRate age={this.state.age} />
        </div>);
    }
    else {
      return (
        <div className="Profile">
          <p>This is a profile page. You need to be logged in to view it.</p>
        </div>
      );
    }
  }
}

export default Profile;