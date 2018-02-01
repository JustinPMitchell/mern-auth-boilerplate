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
      meals: []
    }
  }

  componentDidMount = () => {
    axios.get('/api/meal')
      .then(res => {
        this.setState({ meals: res.data });
        console.log(this.state.meals);
      })
    var that = this;
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
          <h4>BMI</h4>
          <p>Macros</p>
          <table class="table table-stripe">
            <thead>
              <tr>
                <th>
                  <div className="macro-header">
                    Carbs  
                  </div>
                  <div className="macro-content"><br/>
                    <h1>280g</h1><br/>
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
                    <h1>52g</h1><br/>
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
                    <h1>70g</h1><br/>
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