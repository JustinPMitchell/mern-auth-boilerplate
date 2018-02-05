import React, { Component } from 'react';


class Footer extends Component {
  render(){
    return(
        <div>
          <div className="footer">
              <span className="footer-text">Created by Chomper Co. &copy; {new Date().getFullYear()}</span>
          </div>
        </div>
      );
  }
}

export default Footer;


