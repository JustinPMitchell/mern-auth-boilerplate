import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
      fat: 0
    }
  }


  componentDidMount = () => {
    axios.get('/api/meal')
      .then(res => {
        this.setState({ meals: res.data });
        console.log(this.state.meals);
      })
    var that = this;



    var calculateBmr = () => {
      console.log('bmr works');   

      function calculateAge() { // dob is a date
        var dob = new Date(that.props.user.dob);
        console.log(dob);
        var ageDifMs = Date.now() - dob.getTime();
        console.log("Age Difference: " + ageDifMs);
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      }
      
      var age = calculateAge();

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
      console.log('this is the bmr: ', bmr);
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

      if(this.props.user.desire === 'loose weight') {
        bmr *= .85;
        this.setState({ calorie: bmr });
        this.setState({ carbs: bmr * .30 });
        this.setState({ protein: bmr * .35 });
        this.setState({ fat: bmr * .35 });
      } else if(this.props.user.desire === 'gain weight') {
        bmr *= 1.15;
        this.setState({ calorie: bmr });
        this.setState({ carbs: bmr * .30 });
        this.setState({ protein: bmr * .35 });
        this.setState({ fat: bmr * .35 });
      } else {
        bmr *= 1;
        this.setState({ calorie: bmr });
        this.setState({ carbs: bmr * .30 });
        this.setState({ protein: bmr * .35 });
        this.setState({ fat: bmr * .35 });
      }

      console.log('this is the recommended calorie count: ', bmr);
      return bmr;
    }

    calculateCalorie(calculateBmr());

  }

  delete(id){
    console.log(id);
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
          <h4>Your BMR: { Math.round(this.state.bmr) }</h4>
          <h4>Recommendended Calorie Intake: { Math.round(this.state.calorie) }</h4>
          <hr/>
          <h2>Macros</h2>
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
                      <h3>count(-5%): 250g</h3>
                      <h3>count : 275g</h3>
                      <h3>count(+5%): 300g</h3>
                    </div>
                  </div>
                </th>
                <th>
                  <div className="macro-header">
                    Protein  
                  </div>
                  <div className="macro-content"><br/>
                    <h1>{ Math.round(this.state.protein) }g</h1><br/>
                    <h4>carb intake</h4><br/>
{/*                    counld light these up when someone is within the recc.
*/}                 <h2>Goals</h2>
                    <div className="macro-count">
                      <h3>count(-5%): 50g</h3>
                      <h3>count : 56g</h3>
                      <h3>count(+5%): 60g</h3>
                    </div>
                  </div>
                </th>
                <th>
                  <div className="macro-header">
                    Fat  
                  </div>
                  <div className="macro-content"><br/>
                    <h1>{ Math.round(this.state.fat) }g</h1><br/>
                    <h4>carb intake</h4><br/>
{/*                    counld light these up when someone is within the recc.
*/}                 <h2>Goals</h2>
                    <div className="macro-count">
                      <h3>count(-5%): 55g</h3>
                      <h3>count : 60g</h3>
                      <h3>count(+5%): 65g</h3>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
          </table>
          <hr/>
{/* Table for adding information to the database, just here for testing, does not need to be here forever, or could be?? */}
          <table class="table table-stripe">
            <thead>
              <tr>
                <th>Start</th>
                <th>End</th>
                <th>Metadata</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {this.state.meals.map(meal => {
                if(meal.user == that.props.user.email) {
                  console.log('this is the name of the meal ', that.state.meals[0].name);
                  console.log('this is the id from the meal ', meal.id);
                  console.log('this is the id from the user ', that.props.user.id);
                  return (
                    <tr>
                      <td>{meal.start}</td>
                      <td>{meal.end}</td>
                      <td>{meal.mealdata}</td>
                      <td><button onClick={that.delete.bind(that, meal.id)} class="btn btn-danger">Delete</button></td>
                      <td><Link to={`/edit/${meal.id}`} class="btn btn-success">Edit</Link>&nbsp;</td>
                    </tr>
                  )
                }
              })}
            </tbody>
          </table>
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