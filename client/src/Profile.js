import React, { Component } from 'react';
import MealItem from './Meal/MealItem.js';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
      return (<div>
          <h2>HELLO AGAIN {this.props.user.name}!</h2>
          <h4>Your email is {this.props.user.email}</h4>
          <p>this is height {this.props.user.height}</p>
          <p>wow you should really loose some weight {this.props.user.weight}</p>
          <p>this is sex {this.props.user.sex}</p>
          <MealItem />
          <table class="table table-stripe">
            <thead>
              <tr>
                <th>Name</th>
                <th>Calories</th>
                <th>Protein</th>
                <th>Delete</th>
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
                      <td>{meal.name}</td>
                      <td>{meal.calories}</td>
                      <td>{meal.protein}</td>
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
      return (<p>This is a profile page. You need to be logged in to view it.</p>);
    }
  }
}

export default Profile;