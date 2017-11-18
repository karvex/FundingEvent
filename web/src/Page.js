import React, { Component } from 'react'
import './index.css'
import RegisterSpeaker from './RegisterSpeaker'
import RegisterParticipant from './RegisterParticipant'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class Page extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <RegisterSpeaker />
          <RegisterParticipant />
        </MuiThemeProvider>
      </div>
    )
  }
}

export default Page
