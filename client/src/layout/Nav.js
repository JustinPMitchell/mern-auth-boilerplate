import React, { Component } from 'react';
import Logout from '../auth/Logout.js';
import { Link } from 'react-router-dom';

class Nav extends Component {
  render(){
    let links = <span />;
    if(this.props.user){
      links = (
        <span>
          <Link to="/profile">Profile</Link>
          <Link to="/settings">Settings</Link>
          <Logout updateUser={this.props.updateUser} />
        </span>);
    }
    else {
      links = (
        <span>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/settings">Settings</Link>
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
              <li className="mobile-nav-item"><h3>Sunday</h3></li>
              <li className="mobile-nav-item"><h1>Monday</h1></li>
              <li className="mobile-nav-item"><h3>Tuesday</h3></li>
            </ul>
          </nav>
        </div>
      );
  }
}

export default Nav;