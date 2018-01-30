import React,{Component} from 'react';
import MealItem from './MealItem.js';

class MealWrapper extends Component {
    render() {
      return (
        <div className="meal-wrapper">
            <h1 className="meal-type-label">{this.props.mealtype}</h1>
            <MealItem />
        </div>
      );
    }
  }
  
  export default MealWrapper;