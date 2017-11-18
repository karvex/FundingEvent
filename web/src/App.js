import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Page from './Page'

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Route exact path='/' component={Page}/>
        <Route path='/Page1' component={Page}/>
        <Route path='/Page2' component={Page}/>
      </div>
    );
  }
}

export default App;
