import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class MealCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      calories: '',
      protein: '',
      user: this.props.user.name, //change to id?
      redirect: false
    }
  }

  handleNameChange = (e) => {
    this.setState({name: e.target.value})
  }
  handleCaloriesChange = (e) => {
    this.setState({calories: e.target.value})
  }
  handleProteinChange = (e) => {
    this.setState({protein: e.target.value})
  }
  handleUserChange = (e) => {
    this.setState({user: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/meal', {
      name: this.state.name,
      calories: this.state.calories,
      protein: this.state.protein,
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
                  <input name="Name"
                       placeholder="What is the name of the food?"
                       value={this.state.name}
                       onChange={this.handleNameChange}
                  />
                </div>
                <div>
                  <input name="Calories"
                       placeholder="What is the calorie count?"
                       value={this.state.calories}
                       onChange={this.handleCaloriesChange} />
                 </div>
                 <div>
                  <input name="Protein"
                     placeholder="What is the protein count?"
                     value={this.state.protein}
                     onChange={this.handleProteinChange} />
                 </div>
                 <div>
                  <input type="hidden"
                     name="User"
                     value={this.props.user.name} />
                 </div>
                 <div>
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