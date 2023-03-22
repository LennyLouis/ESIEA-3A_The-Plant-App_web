import React, { Component } from 'react';
import plant from './trace.svg';
import './App.css';
import { io } from 'socket.io-client';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      temperature: "",
      humidity: "",
      dirtHumidity: "",
      lastWatering: ""
    };
  }

  updateStatistics(data){
    this.setState({
      temperature: data.temperature,
      humidity: data.humidity,
      dirtHumidity: data.dirtHumidity,
      lastWatering: data.lastWatering
    });
  }

  componentDidMount() {
    console.log('YES');
    const socket = io.connect('ws://127.0.0.1:3001');
    socket.on('data', data => {
      this.updateStatistics(data);
    });
  }

  render() {
    return (
      <div className="App">
        <div className="Title">
          <span>
            MyGarden
          </span>
        </div>
        <div className="Container">
          <img src={plant}></img>
          <div className="Statistics">
            <div className="Temperature">{ this.state.temperature }</div>
            <div className="Humidity">{ this.state.humidity }</div>
            <div className="DirtHumidity">{ this.state.dirtHumidity }</div>
            <div className="LastWatering">{ this.state.lastWatering }</div>
          </div>
          <div className="Watering">
            <span>
              Arroser
            </span>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
