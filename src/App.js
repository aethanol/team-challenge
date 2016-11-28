import React, { Component } from 'react';
import TeamSignUp from './TeamSignUp';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      submitted: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    this.setState({submitted: true});
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Sign Up</h2>
          <p>Our service is fun and awesome, but you must be 13 years old to join</p>
        </div>
        {this.state.submitted
        &&
        <div className="alert alert-success" role="alert">
          Thanks for signing up!
        </div>}
        <TeamSignUp submitCallback={this.handleSubmit}/>
      </div>
    );
  }
}

export default App;
