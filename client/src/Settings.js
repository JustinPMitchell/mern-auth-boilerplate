import React, { Component } from 'react';
import axios from 'axios';




class Settings extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    axios.get('/settings/'+this.props.user.id)
      .then(res => {
        this.setState({ user: res.data });
        console.log(this.state.user);
      });
  }

  onChange = (e) => {
    const state = this.state.user
    state[e.target.name] = e.target.value;
    this.setState({user:state});
  }



    onSubmit = (e) => {
      e.preventDefault();

      const { height, weight, sex, password } = this.state.user;

      axios.put('/settings/'+this.props.user.id, { height, weight, sex, password })
      .then((result) => {
        this.props.history.push("/profile")
      });
    }


  render() {
    let form = '';

    form = (<form onSubmit={this.onSubmit}>
              <div>
                <input name="height"
                     placeholder="Enter your height"
                     value={this.state.user.height}
                     onChange={this.onChange}
                />
              </div>
              <div>
                <input name="weight"
                     placeholder="Enter your weight"
                     value={this.state.user.weight}
                     onChange={this.onChange}
                />
              </div>
              <div>
                <input name="sex"
                     placeholder="Enter your sex"
                     value={this.state.user.sex}
                     onChange={this.onChange}
                />
              </div>
              <div>
                <input name="password"
                     placeholder="Enter your password"
                     value={this.state.user.password}
                     onChange={this.onChange}
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