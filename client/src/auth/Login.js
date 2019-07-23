import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleEmailChange = (e) => {
    this.setState({email: e.target.value});
  }

  handlePasswordChange = (e) => {
    this.setState({password: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/auth/login', {
      email: this.state.email,
      password: this.state.password
    }).then((result) => {
      localStorage.setItem('mernToken', result.data.token);
      this.setState({ success: true });
      this.props.updateUser();
      window.location.href = "/profile";
    }).catch((error) => {
      console.log('error returned', error.response.data);
      this.props.setFlash('error', error.response.status + ': ' + (error.response.data && error.response.data.error ? error.response.data.message : error.response.statusText));
    });
  }

  render() {
    let form = '';
    if(this.props.user && this.props.user !== null){
      console.log("redirecting to profile with this user: ", this.props.user);
      return (<Redirect to="/profile" />);
    }
    else {
      form = (<form className="form-wrapper" onSubmit={this.handleSubmit}>
                <div className="form-input">
                  <label for="email"></label>
                  <input id="email" name="Email"
                       placeholder="Email"
                       value={this.state.email}
                       onChange={this.handleEmailChange}
                  />
                </div>
                <div className="form-input">
                  <label for="password"></label>
                  <input id="password" name="Password"
                       placeholder="Password"
                       type="password"
                       value={this.state.password}
                       onChange={this.handlePasswordChange}
                  />
                </div>
                <button type="submit" className="btn-primary">Login</button>
                <button className="btn-primary sign-up-button"><Link to="/signup">Sign Up</Link></button>
              </form>);
    }
    return (
      <div>
        {form}
      </div>
    );
  }
}

export default Login;
