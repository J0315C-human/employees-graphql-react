import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends React.Component {
  public render() {
    return (
      <Router>
        <Route component={() => (<h2>HI I AM APP</h2>)} />
      </Router>
    );
  }
}

export default App;
