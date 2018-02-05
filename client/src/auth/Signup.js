import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      height: 177,
      weight: 80,
      sex: 'male',
      //* add to state
      dob: '01/01/1999',
      exercise: '',
      desire: ''
    }
  }
  //dry this out
  handleNameChange = (e) => {
    this.setState({name: e.target.value})
  }
  handleEmailChange = (e) => {
    this.setState({email: e.target.value})
  }
  handlePasswordChange = (e) => {
    this.setState({password: e.target.value})
  }
  handleHeightChange = (e) => {
    this.setState({height: e.target.value})
  }
  handleWeightChange = (e) => {
    this.setState({weight: e.target.value})
  }
  handleSexChange = (e) => {
    this.setState({sex: e.target.value})
  }
  //* add new function handle
  handleDobChange = (e) => {
    this.setState({dob: e.target.value});
  }
  handleExerciseChange = (e) => {
    this.setState({exercise: e.target.value});
  }
  handleDesireChange = (e) => {
    this.setState({desire: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/auth/signup', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      height: this.state.height,
      weight: this.state.weight,
      sex: this.state.sex,
      //add to axios post
      dob: this.state.dob,
      exercise: this.state.exercise,
      desire: this.state.desire
    }).then(result => {
      localStorage.setItem('mernToken', result.data.token);
      this.props.updateUser();
    }).catch(error => {
      console.log(error.response);
      this.props.setFlash('error', error.response.status + ': ' + (error.response.data && error.response.data.error ? error.response.data.message : error.response.statusText));
    })
  }

  render() {
    let form = '';
    if(this.props.user){
      return (<Redirect to="/profile" />);
    }
    else {
      form = (<form onSubmit={this.handleSubmit}>
                <div className="form-input">
                  <label for="name">Name:</label>
                  <input id="name" name="Name"
                       placeholder="Patrick Star"
                       value={this.state.name}
                       onChange={this.handleNameChange}
                  />
                </div>
                <div className="form-input">
                  <label for="email">Email:</label>
                  <input id="email" name="Email"
                       placeholder="patrickstar@gmail.com"
                       value={this.state.email}
                       onChange={this.handleEmailChange} />
                 </div>
                 <div className="form-input">
                  <label for="password">Password:</label>
                  <input id="password" name="Password"
                     placeholder="************"
                     type="password"
                     value={this.state.password}
                     onChange={this.handlePasswordChange} />
                 </div>
                 <div className="form-input">
                  <label for="height">Height(cm):</label>
                  <input id="height" name="Height"
                     placeholder="177"
                     type="number"
                     value={this.state.height}
                     onChange={this.handleHeightChange} />
                 </div>
                 <div className="form-input">
                  <label for="weight">Weight(kg):</label>
                  <input id="weight" name="Weight"
                     placeholder="80"
                     type="number"
                     value={this.state.weight}
                     onChange={this.handleWeightChange} />
                 </div>
                 <div className="form-input">
                  <label for="sex">Sex:</label>
                  <select id="sex" name="Sex" onChange={this.handleSexChange} className="sex-dropdown">
                    <option value="male">male</option>
                    <option value="female">female</option>
                    <option value="other">other</option>                    
                  </select>
                 {/* <label for="sex">Sex:</label>
                  <input id="sex" name="Sex"
                     placeholder="male"
                     type="sex"
                     value={this.state.sex}
                     onChange={this.handleSexChange} /> */}
                 </div>
                <div className="form-input">
                  <label for="dob">Date of Birth:</label>
                  <input id="dob" name="dob"
                       type="date"
                       placeholder="01/01/1999"
                       value={this.state.dob}
                       onChange={this.handleDobChange} />
                </div>
                <div className="form-input">
                  <label for="exercise">Exercise:</label>
                  <select id="exercise" name="exercise" onChange={this.handleExerciseChange} className="exercise-dropdown">
                    <option value="not at all">not at all</option>
                    <option value="little">little</option>
                    <option value="moderate">moderate</option>
                    <option value="active">active</option>
                    <option value="extra active">extra active</option>                                        
                    <option value="other">other</option>                         
                  </select>
                </div>
                <div className="form-input">
                  <label for="desire">Desire:</label>
                  <select id="desire" name="desire" onChange={ this.handleDesireChange } className="desire-dropdown">
                    <option value="fat loss">fat loss</option>
                    <option value="maintenance">maintenance</option>
                    <option value="build muscle">build muscle</option>
                    <option value="other">other</option>                      
                  </select>
                </div>                                                                     
                <button type="submit" className="btn-primary">SignUp</button>
              </form>);
    }
    return (
      <div>
        {form}
        {this.props.user ? <Redirect to="/profile" /> : ''}
      </div>
    );
  }
}

export default Signup;