import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class MealCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      start: '',
      end: '',
      mealdata: '',
      user: this.props.user.email, //change to id?
      redirect: false
    }
  }

  handleStartChange = (e) => {
    this.setState({start: e.target.value})
  }
  handleEndChange = (e) => {
    this.setState({end: e.target.value})
  }
  handleMealDataChange = (e) => {
    this.setState({mealdata: e.target.value})
  }
  handleUserChange = (e) => {
    this.setState({user: e.target.value})
  }


  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/meal', {
      start: this.state.start,
      end: this.state.end,
      mealdata: this.state.mealdata,
      user: this.state.user
    }).then(() => this.setState({ redirect: true }))
    .catch(error => {
      console.log(error);
      this.props.setFlash('error', error.response.status + ': ' + (error.response.data && error.response.data.error ? error.response.data.message : error.response.statusText));
    })
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/profile' />;
    }

    let form = '';
      form = (<form onSubmit={this.handleSubmit}>
                <div>
                  <input name="start"
                       placeholder="Meal plan start"
                       value={this.state.start}
                       onChange={this.handleStartChange}
                  />
                </div>
                <div>
                  <input name="end"
                       placeholder="Meal plan end"
                       value={this.state.end}
                       onChange={this.handleEndChange}
                  />
                </div>
                <div>
                  <input name="mealdata"
                       placeholder="mealdata"
                       value={this.state.mealdata}
                       onChange={this.handleMealDataChange}
                  />
                </div>    
                <div>
                  <input type="hidden"
                    name="User"
                    value={this.props.user._id} />
                </div>
                <input type="submit" value="Add Meal" className="btn-primary" />
              </form>);
    return (
      <div>
        {form}
      </div>
    );
  }
}

export default MealCreate;