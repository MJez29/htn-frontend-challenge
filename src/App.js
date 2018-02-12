import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Countdown from "./components/countdown";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="countdown">
          <Countdown/>
        </div>
      </div>
    );
  }
}

export default App;
