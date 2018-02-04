import React, { Component } from 'react';


class HeartRate extends Component {
  constructor(props){
    super(props);
    this.state = {
      multiplier: .7,
      name: 'Moderate'
    }
    this.heartRateChange = this.heartRateChange.bind(this);
  }

  componentDidMount = () => {

  }


heartRateChange(e){
  e.preventDefault();
  console.log('button was clicked');
  this.setState({multiplier: e.target.name,
                  name: e.target.className});

}

  render() {
    return (
      <div>
        <h2>Heart Rate</h2>
        <h3>{this.state.name} Heart Rate: {Math.round((220 - this.props.age) * this.state.multiplier)}</h3>
        <a onClick={this.heartRateChange} name="0.4" className="Resting">Resting</a>
        <a onClick={this.heartRateChange} name="0.7" className="Moderate">Moderate</a>
        <a onClick={this.heartRateChange} name="0.85" className="Vigorous">Vigorous</a>
        <a onClick={this.heartRateChange} name="1" className="Max">Max</a>

      </div>
    );
  }
}

export default HeartRate;