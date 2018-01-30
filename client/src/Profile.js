import React, { Component } from 'react';
import MealItem from './Meal/MealItem.js';

class Profile extends Component {
  render(){
    if(this.props.user && this.props.user.name){
      return (<div>
          <h2>HELLO AGAIN {this.props.user.name}!</h2>
          <h4>Your email is {this.props.user.email}</h4>
          <p>this is height {this.props.user.height}</p>
          <p>wow you should really loose some weight {this.props.user.weight}</p>
          <p>this is sex {this.props.user.sex}</p>
          <MealItem />
        </div>);
    }
    else {
      return (<p>This is a profile page. You need to be logged in to view it.</p>);
    }
  }
}

export default Profile;