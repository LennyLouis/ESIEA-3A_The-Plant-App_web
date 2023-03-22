import React, { Component } from 'react';
import plant from './trace.svg';
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.state = { apiResponse: ""};
  }

  callAPI(){
    fetch('http://localhost:9000/mqttCommunication')
    .then(res => res.text())
    .then(res => this.setState({apiResponse: res}))
    .catch(err => err);
  }

  componentDidMount() {
    this.callAPI();
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
            <div className="Temperature">20.2°C</div>
            <div className="Humidity">22%</div>
            <div className="DirtHumidity">80%</div>
            <div className="LastWatering">{ this.state.apiResponse }</div>
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
