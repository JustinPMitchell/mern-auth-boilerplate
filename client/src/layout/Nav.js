import React, { Component } from 'react';
import Logout from '../auth/Logout.js';
import { Link } from 'react-router-dom';

class Nav extends Component {
  changeDay = (e) =>{
    //making sure target is not LI
    if(e.target.getAttribute("class")!== "mobile-nav-item"){
      this.props.setDateIndex(e.target.innerText);
    }
  }
  setNavDates = () =>{
    console.log(this.props.dateIndex);
    let dates = this.props.dates;
    let datesToDisplay = [];
    if(this.props.dateIndex === 0){
      datesToDisplay = ["Saturday","Sunday","Monday"];
    }else if(this.props.dateIndex === dates.length-1){
      datesToDisplay = ["Friday","Saturday","Sunday"];
    }else{
      datesToDisplay = [dates[this.props.dateIndex-1],dates[this.props.dateIndex],dates[this.props.dateIndex+1]];
    }
    return datesToDisplay;
  }
  render(){
    let displayDates = this.setNavDates();
    console.log(displayDates);
    let links = <span />;
    if(this.props.user){
      links = (
        <span>
          <Link to="/profile">Profile</Link>
          <Link to="/settings">Settings</Link>
          <Link to="/mealcreate">Create a New Meal</Link>
          <Logout updateUser={this.props.updateUser} />
        </span>);
    }
    else {
      links = (
        <span>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/settings">Settings</Link>
          <Link to="/mealcreate">Create a New Meal</Link>
        </span>);
    }
    return(
        <div>
          <nav className="default-nav">
            <a href="/">Home</a>
            {links}
          </nav>
          <nav className="mobile-nav">
            <ul className="mobile-nav-item-wrapper">
              <li onClick={(e)=>this.changeDay(e)} className="mobile-nav-item" id="prevDay" day={displayDates[0]}><h3>{displayDates[0]}</h3></li>
              <li onClick={(e)=>this.changeDay(e)} className="mobile-nav-item" id="currentDay" day={displayDates[1]}><h1>{displayDates[1]}</h1></li>
              <li onClick={(e)=>this.changeDay(e)} className="mobile-nav-item" id="nextDay" day={displayDates[2]}><h3>{displayDates[2]}</h3></li>
            </ul>
          </nav>
        </div>
      );
  }
}

export default Nav;