import React,{Component} from 'react';
import MealItem from './MealItem.js';
class MealWrapper extends Component {                                                  
    render() {    
      return (
        <div className="meal-wrapper">
            <h1 className="meal-type-label">{this.props.mealType}</h1>
            <MealItem mealName={this.props.mealName} mealCal={this.props.mealCal} mealIngredients={this.props.mealIngredients}/>
        </div>
      );
    }
  }
  
  export default MealWrapper;