import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      status: 'off',
      time: 0,
      timer: null
    };
  }

  formatTime = arg => { 
    if(arg == undefined ||isNaN(arg) || typeof(arg) == 'function' || arg < 0) {
      return null;
    }
    else {
      let input = arg;
      let seconds = Math.floor(input%60).toString();
      let minutes = Math.floor((input/60)%60).toString();

      return minutes.padStart(2, '0') + ':' + seconds.padStart(2, '0');
    }
  };

  startTimer = () => {
    this.setState({
      status: 'work',
      time: 1200,
      timer: setInterval(this.step, 1000),
    })
  };
  
  stopTimer = () => {
    this.setState({
      status: 'off',
      time: 0,
      timer: clearInterval(this.state.timer),
    })
  };

  closeApp = () => {
    window.close();
  };

  playBell = () => {
    const audioElement = new Audio('./sounds/bell.wav');
    audioElement.play();
  };
 
  step = () => {
    this.setState({
      time: this.state.time - 1,
    })

    if(this.state.time === 0) {
      this.playBell();
      if(this.state.status === 'work') {
        this.setState({
          status: 'rest',
          time: 20,
        })
      }
      
      else if(this.state.status === 'rest') {
        this.setState({
          status: 'work',
          time: 1200,
        })
      }
    };
  };

  render() {
    const { status } = this.state;

    return (
      <div>
        <h1>Protect your eyes</h1>
        {(status === 'off') && 
        <div>
        <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
        <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>}
        {(status === 'work') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}
        {(status !== 'off') && <div className="timer">{this.formatTime(this.state.time)}</div>}  
        {(status === 'off') && <button className="btn" onClick={this.startTimer}>Start</button>}
        {(status !== 'off') && <button className="btn" onClick={this.stopTimer}>Stop</button>}
        <button className="btn btn-close" onClick={this.closeApp}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
