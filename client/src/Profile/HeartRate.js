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
    /*ECG*/
    function drawLine(ctx, y, h) {
        
        function randHeight(position) {
            var change  = h * (2/7);
            var padding = h * (1/4);
            var range   = h - (padding * 2);
            if (!position) position = (Math.random() * range) + padding;
            return clip(position + (Math.random() * (change * 2) - change), padding + y, range + padding + y);
        }
        
        function clip(number, min, max) {
            return Math.min(Math.max(number, min + (Math.random() * (max-min) * 0.2)), max - (Math.random() * (max-min) * 0.2));
        }
        
        ctx.globalCompositeOperation = 'source-over';

        ctx.fillStyle = 'white';
        
        ctx.fillRect(0, y, ctx.canvas.width, h);
        
        ctx.globalCompositeOperation = 'destination-out';

        ctx.beginPath();
        var lastPosition = randHeight();
        ctx.moveTo(0, lastPosition);
        for (var i = 0; i < ctx.canvas.width; i++) {
            ctx.lineTo(i += Math.random() * 5, lastPosition = randHeight(lastPosition));
        }
        ctx.stroke();
        
    }
    
    var canvas = document.getElementById('c');
    var ctx    = canvas.getContext('2d');
    var lines = 1;

    for (var i = 0; i < lines; i ++) {
        drawLine(ctx, i * (canvas.height / lines), canvas.height / lines);
    }
    /*end ECG*/
  }


heartRateChange(e){
  e.preventDefault();
  this.setState({multiplier: e.target.name,
                  name: e.target.className});
  document.getElementById('c').setAttribute('style', '-webkit-animation-duration: ' +  ((1 / e.target.name) * 180/60) + 's;');
}


  render() {
    return (
      <div className="HeartRate">
        <h2 className="profile-title">Heart</h2>
        <p>Know your heartrate: </p>
        <a href="https://www.dignityhealth.org/articles/finding-your-pulse-is-the-first-step-to-calculate-heart-rate">Heart Rate</a>
        <h3>{this.state.name} Heart Rate: {Math.round((220 - this.props.age) * this.state.multiplier)} bpm</h3>   
        <canvas id="c" width="500" height="200" ref="chart"></canvas>
        <div className="heart-rate-links">
          <a onClick={this.heartRateChange} name="0.4" className="Resting">Resting</a>
          <a onClick={this.heartRateChange} name="0.7" className="Moderate">Moderate</a>
          <a onClick={this.heartRateChange} name="0.85" className="Vigorous">Vigorous</a>
          <a onClick={this.heartRateChange} name="1" className="Max">Max</a>
        </div>
      </div>
    );
  }
}

export default HeartRate;