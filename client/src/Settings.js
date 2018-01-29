import React, { Component } from 'react';
import axios from 'axios';


class Settings extends Component {

  constructor(props) {
    super(props)
    this.state = {
      height: '',
      weight: '',
      sex: ''
    }
  }

  handleHeightChange = (e) => {
    this.setState({height: e.target.value});
  }

  handleWeightChange = (e) => {
    this.setState({weight: e.target.value});
  }

  handleSexChange = (e) => {
    this.setState({sex: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/auth/login', {
      height: this.state.height,
      weight: this.state.weight,
      sex: this.state.sex
    }).then((result) => {
      localStorage.setItem('mernToken', result.data.token);
      this.setState({ success: true });
      this.props.updateUser();
    }).catch((error) => {
      console.log('error returned', error.response.data);
      this.props.setFlash('error', error.response.status + ': ' + (error.response.data && error.response.data.error ? error.response.data.message : error.response.statusText));
    });
  }


  render() {
    let form = '';

    form = (<form onSubmit={this.handleSubmit}>
              <div>
                <input name="height"
                     placeholder="Enter your height"
                     value={this.state.height}
                     onChange={this.handleHeightChange}
                />
              </div>
              <div>
                <input name="weight"
                     placeholder="Enter your weight"
                     type="password"
                     value={this.state.weight}
                     onChange={this.handleWeightChange}
                />
                <input name="sex"
                     placeholder="Enter your sex"
                     type="password"
                     value={this.state.sex}
                     onChange={this.handleSexChange}
                />
              </div>
              <input type="submit" value="Update Settings" className="btn-primary" />
            </form>);

    return (
      <div className="settings">
        <h1>Settings Coming soon</h1>
        <div>
          {form}
        </div>

      </div>
    );
  }
}

export default Settings;