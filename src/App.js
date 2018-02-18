import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Countdown from "./components/countdown";

import Schedule from "./components/schedule/schedule";

class App extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="App">
	  	<div className="jumbo">
			<div className="countdown">
				<Countdown/>
			</div>
		</div>
		<div>
			<Schedule />
		</div>
      </div>
    );
  }
}

export default App;
