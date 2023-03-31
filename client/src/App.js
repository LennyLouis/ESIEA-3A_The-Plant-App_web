import React, { Component } from 'react'; 
import plant from './trace.svg';
import './App.css';
import { io } from 'socket.io-client';

class App extends Component {
  constructor(props){
    super(props);
    this.socket = io.connect('ws://127.0.0.1:3001');
    this.state = {
      temperature: "",
      brightness: "",
      dirtHumidity: "",
      lastWatering: "Aucun"
    };
  }

  updateStatistics(data){
    var date = null;
    if(data.lastWatering === 'now'){
      date = new Date();
      this.setState({
        lastWatering: date.toLocaleString()
      });
    } else {
      this.setState({
        temperature: "T : " + data.temperature + "°C",
        brightness: "B : " + data.brightness+ "%",
        dirtHumidity: "H : " + data.dirtHumidity + "%"
      });
    }
  }

  componentDidMount() {
    this.socket.on('data', data => {
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
          <img src={plant} alt="Plante"></img>
          <div className="Statistics">
            <div className="Temperature">{ this.state.temperature }</div>
            <div className="Brightness">{ this.state.brightness }</div>
            <div className="DirtHumidity">{ this.state.dirtHumidity }</div>
            <div className="LastWatering">{ this.state.lastWatering }</div>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
