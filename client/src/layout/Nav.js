import React, { Component } from 'react';
import Logout from '../auth/Logout.js';
import { Link } from 'react-router-dom';

//images
import logo from '../images/pineapple.png';


var xDown = null;                                                        
var yDown = null; 
let displayDates;
class Nav extends Component {
  //change date stuff
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
  //swipe stuff
  handleTouchStart = (evt) => {                                         
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
  }                                                

 handleTouchMove = (evt) => {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
      console.log(displayDates);
        if ( xDiff > 0 ) {
            /* left swipe */ 
            this.props.setDateIndex(displayDates[2]);
        } else {
            /* right swipe */
            this.props.setDateIndex(displayDates[0]);
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
        } else { 
            /* down swipe */
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};
  render(){
    document.addEventListener('touchstart', this.handleTouchStart, false);        
    document.addEventListener('touchmove', this.handleTouchMove, false); 
    displayDates = this.setNavDates();
    console.log(displayDates);
    let links = <span />;
    if(this.props.user){
      links = (
        <span>
          <Link to="/">Plan</Link>
          <Link to="/profile">Profile</Link>
          <Logout updateUser={this.props.updateUser} />
        </span>);
    }
    else {
      links = (
        <span>
        </span>);
    }
    return(
        <div>
          <nav className="default-nav">
            <li className="default-nav-logo"><a href="/"><img className="logo" src={logo}></img></a></li>
            <ul className="default-nav-item-wrapper">
              {links}
            </ul>
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