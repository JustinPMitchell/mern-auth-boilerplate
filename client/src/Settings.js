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
      const { height, weight, sex, exercise, desire } = this.state.user;
      axios.put('/settings/'+this.props.user.id, { height, weight, sex, exercise, desire })
      .then((result) => {
        console.log('promise is reached');
        window.location.href = "/profile";
        if(this.props.router){
          console.log('if statement is reached');
          this.props.router.push("/profile");
        }
        this.props.updateUser();
      });
    }


  render() {
    let form = '';

    form = (<form onSubmit={this.onSubmit}>
              <div className="form-input">
                <label for="height">Height:</label>              
                <input id="height" name="height"
                     placeholder="Enter your height"
                     value={this.state.user.height}
                     onChange={this.onChange}
                />
              </div>
              <div className="form-input">
                <label for="weight">Weight:</label>              
                <input id="weight" name="weight"
                     placeholder="Enter your weight"
                     value={this.state.user.weight}
                     onChange={this.onChange}
                />
              </div>
              <div className="form-input">
                <label for="sex">Sex:</label>
                <input id="sex" name="sex"
                     placeholder="Enter your sex"
                     value={this.state.user.sex}
                     onChange={this.onChange}
                />
              </div>
              <div className="form-input">
                <label for="exercise">Exercise:</label>
                <input id="exercise" name="exercise"
                     placeholder="not at all"
                     value={this.state.user.exercise}
                     onChange={this.onChange}
                />
              </div>
              <div className="form-input">
                <label for="desire">Desire:</label>
                <input id="desire" name="desire"
                     placeholder="loose weight"
                     value={this.state.user.desire}
                     onChange={this.onChange}
                />
              </div>                            
              <input href="/profile" type="submit" value="Update Settings" className="btn-primary" />
            </form>);

    return (
      <div className="settings">
        <h1>Personal Information: </h1>
        <div>
          {form}
        </div>

      </div>
    );
  }
}

export default Settings;