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
                    <option value="male" selected={this.state.user.sex === "male" ? "true" : "false"}>male</option>
                    <option value="female" selected={this.state.user.sex === "female" ? "true" : "false"}>female</option>
                    <option value="other"  selected={this.state.user.sex === "other" ? "true" :"false"}>other</option>                    
                  </select>
              </div>
              <div className="form-input">
                <label for="exercise">Exercise:</label>
                  <select id="exercise" name="exercise" onChange={this.onChange} className="exercise-dropdown">
                    <option value="not at all" selected={this.state.user.exercise === "not at all" ? "true" :"false"}>not at all</option>
                    <option value="little" selected={this.state.user.exercise === "little" ? "true" :"false"}>little</option>
                    <option value="moderate" selected={this.state.user.exercise === "moderate" ? "true" :"false"}>moderate</option>
                    <option value="active" selected={this.state.user.exercise === "active" ? "true" :"false"}>active</option>
                    <option value="extra active" selected={this.state.user.exercise === "extra active" ? "true" :"false"}>extra active</option>                                        
                    <option value="other" selected={this.state.user.exercise === "other" ? "true" :"false"}>other</option>                         
                  </select>
              </div>
              <div className="form-input">
                <label for="desire">Desire:</label>
                  <select id="desire" name="desire" onChange={this.onChange} className="desire-dropdown">
                    <option value="fat loss" selected={this.state.user.desire === "fat loss" ? "true" :"false"}>fat loss</option>
                    <option value="maintenance" selected={this.state.user.desire === "maintenance" ? "true" :"false"}>maintenance</option>
                    <option value="build muscle" selected={this.state.user.desire === "build muscle" ? "true" :"false"}>build muscle</option>
                    <option value="other" selected={this.state.user.desire === "other" ? "true" :"false"}>other</option>                      
                  </select>
              </div>                            
              <button href="/profile" type="submit" className="btn-primary">Update</button>
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