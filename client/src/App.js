import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import Flash from './layout/Flash.js';
import Footer from './layout/Footer.js';
import Home from './Home.js';
import Nav from './layout/Nav.js';
import Login from './auth/Login.js';
import Profile from './Profile.js';
import Signup from './auth/Signup.js';
import Settings from './Settings.js';
import MealCreate from './Meal/MealCreate.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
      dates:[
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      dateIndex:(function(){
        return new Date().getDay();
      })()
    }
  }
  componentDidMount = () => {
    this.getUser();
  }

  getUser = () => {
    // If there is a token in localStorage
    let token = localStorage.getItem('mernToken');
    if (token === 'undefined' || token === null || token === '' || token === undefined) {
      localStorage.removeItem('mernToken');
      this.setState({
        token: '',
        user: null
      });
    } else {
      //   Validate the token against the server
      axios.post('/auth/me/from/token', {
        token: token
      }).then(response => {
        //   Store the token and user
        localStorage.setItem('mernToken', response.data.token);
        this.setState({
          token: response.data.token,
          user: response.data.user
        });
        //   Pass User into child components and display main app
      }).catch(err => {
        // Both the JWT and db errors will be caught here
        console.log('cdm', err);
        this.setState({
          token: '',
          user: null
        });
      })
    }
  }

  setFlash = (t, msg) => {
    this.setState({
      flash: msg,
      flashType: t
    });
  }

  cancelFlash = () => {
    this.setState({
      flash: '',
      flashType: ''
    });
  }
  setDateIndex = (d) => {
    console.log("DAY INDEX IS  =",d);
    let dIndex = this.state.dates.indexOf(d);
    this.setState({
      dateIndex:dIndex
    });
  }
  render() {
    return (
      <div className="App">
<<<<<<< HEAD
        <Router>
          <div>
            <Nav dates={this.state.dates} dateIndex={this.state.dateIndex} setDateIndex={this.setDateIndex} user={this.state.user} updateUser={this.getUser} />
            <div className="space">
              <Flash flashType={this.state.flashType} flash={this.state.flash} setFlash={this.setFlash} cancelFlash={this.cancelFlash} />
              <Route exact path="/" component={() => (<Home currentDate={this.state.dates[this.state.dateIndex]} />)} />
              <Route path="/login" component={
                () => (<Login user={this.state.user} setFlash={this.setFlash} updateUser={this.getUser} />)} />
              <Route path="/signup" component={
                () => (<Signup user={this.state.user} setFlash={this.setFlash} updateUser={this.getUser} />)} />
              <Route path="/profile" component={
                () => (<Profile user={this.state.user} setFlash={this.setFlash} />)} />
              <Route path="/settings" component={
                () => (<Settings user={this.state.user} setFlash={this.setFlash} updateUser={this.getUser} />)} />
              <Route path="/mealcreate" component={
                () => (<MealCreate user={this.state.user} dates={this.state.dates} setFlash={this.setFlash} />)} />
=======
        <div className="app-content">
          <Router>
            <div>
              <Nav dates={this.state.dates} dateIndex={this.state.dateIndex} setDateIndex={this.setDateIndex} user={this.state.user} updateUser={this.getUser} />
              <div className="space">
                <Flash flashType={this.state.flashType} flash={this.state.flash} setFlash={this.setFlash} cancelFlash={this.cancelFlash} />
                <Route exact path="/" component={() => (<Home currentDate={this.state.dates[this.state.dateIndex]} />)} />
                <Route path="/login" component={
                  () => (<Login user={this.state.user} setFlash={this.setFlash} updateUser={this.getUser} />)} />
                <Route path="/signup" component={
                  () => (<Signup user={this.state.user} setFlash={this.setFlash} updateUser={this.getUser} />)} />
                <Route path="/profile" component={
                  () => (<Profile user={this.state.user} setFlash={this.setFlash} />)} />
                <Route path="/settings" component={
                  () => (<Settings user={this.state.user} setFlash={this.setFlash} updateUser={this.getUser} />)} />
                <Route path="/mealcreate" component={
                  () => (<MealCreate user={this.state.user} setFlash={this.setFlash} />)} />
              </div>
>>>>>>> c5994e3dea48404cbe3d3fcad17f1f54d00ee937
            </div>
          </Router>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
