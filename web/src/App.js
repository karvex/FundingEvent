import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { Web3Provider } from 'react-web3';
import Page from './Page'

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Web3Provider>
          <Route exact path='/' component={Page}/>
          <Route path='/Page1' component={Page}/>
          <Route path='/Page2' component={Page}/>
        </Web3Provider>
      </div>
    );
  }
}

export default App;
