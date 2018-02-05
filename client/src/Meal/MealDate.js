import React, { Component } from 'react';


class MealDate extends Component {
  render() {
    return (
      <img className="meal-img" src={this.props.img}/>
    );
  }
}

export default MealDate;