import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MealItem from './Meal/MealItem.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MealItem />
      </div>
    );
  }
}

export default App;
