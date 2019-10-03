import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom';

import Routes from '../route';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="App-router">
        <Router>
          <Routes/>
        </Router>
      </div>
    );
  }
}
