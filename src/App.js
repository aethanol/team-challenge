import React, { Component } from 'react';
import TeamSignUp from './TeamSignUp';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Sign Up</h2>
          <p>Our service is fun and aweosme, but you must be 13 years old to join</p>
        </div>
        <TeamSignUp />
      </div>
    );
  }
}

export default App;
