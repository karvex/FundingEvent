import React, { Component } from 'react'
import './index.css'
import RegisterSpeaker from './RegisterSpeaker'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class Page extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <RegisterSpeaker />
        </MuiThemeProvider>
      </div>
    )
  }
}

export default Page
