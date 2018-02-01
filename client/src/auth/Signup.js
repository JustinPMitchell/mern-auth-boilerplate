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
      height: '',
      weight: '',
      sex: ''
    }
  }

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

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/auth/signup', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      height: this.state.height,
      weight: this.state.weight,
      sex: this.state.sex
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
                  <label for="height">Height:</label>
                  <input id="height" name="Height"
                     placeholder="68"
                     type="height"
                     value={this.state.height}
                     onChange={this.handleHeightChange} />
                 </div>
                 <div className="form-input">
                  <label for="weight">Weight:</label>
                  <input id="weight" name="Weight"
                     placeholder="145"
                     type="weight"
                     value={this.state.weight}
                     onChange={this.handleWeightChange} />
                 </div>
                 <div className="form-input">
                  <label for="sex">Sex:</label>
                  <input id="sex" name="Sex"
                     placeholder="male"
                     type="sex"
                     value={this.state.sex}
                     onChange={this.handleSexChange} />
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