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
        window.location.href = "/profile";
        if(this.props.router){
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
                  <select id="sex" name="sex" onChange={this.onChange} className="sex-dropdown">
                    <option value="male">male</option>
                    <option value="female">female</option>
                    <option value="other">other</option>                    
                  </select>
              </div>
              <div className="form-input">
                <label for="exercise">Exercise:</label>
                  <select id="exercise" name="exercise" onChange={this.onChange} className="exercise-dropdown">
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
                  <select id="desire" name="desire" onChange={this.onChange} className="desire-dropdown">
                    <option value="fat loss">fat loss</option>
                    <option value="maintenance">maintenance</option>
                    <option value="build muscle">build muscle</option>
                    <option value="other">other</option>                      
                  </select>
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