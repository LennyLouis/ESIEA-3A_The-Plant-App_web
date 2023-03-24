import React, { Component } from 'react'; 
import plant from './trace.svg';
import './App.css';
import { io } from 'socket.io-client';

class App extends Component {
  constructor(props){
    super(props);
    this.watering = this.watering.bind(this);
    this.socket = io.connect('ws://127.0.0.1:3001');
    this.state = {
      temperature: "",
      humidity: "",
      dirtHumidity: "",
      lastWatering: "",
      weather: ""
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

  updateWeather(data){
    this.setState({weather: data.weather[0].main});
  }

  componentDidMount() {
    this.socket.on('data', data => {
      this.updateStatistics(data);
    });

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        const APIKey = "0d28048af1563942f6c1b4685d453442";
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`)
          .then(res => res.json())
          .then(json => this.updateWeather(json))
          .catch(err => err);
      });
    }
  }

  watering(){
    this.socket.emit('watering', 'YES');
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
          <img src={plant} alt="Plante"></img>
          <div className="Statistics">
            <div className="Temperature">{ this.state.temperature }</div>
            <div className="Humidity">{ this.state.humidity }</div>
            <div className="DirtHumidity">{ this.state.dirtHumidity }</div>
            <div className="LastWatering">{ this.state.lastWatering }</div>
            <div className="Weather">{ this.state.weather }</div>
          </div>
          <div className="Watering">
            <button onClick={this.watering}>
              Arroser
            </button>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
