import React, { Component } from 'react'
import './index.css'
import RegisterSpeaker from './RegisterSpeaker'
import Speakers from './Speakers'
import CreateMeetup from './CreateMeetup'
import RegisterParticipant from './RegisterParticipant'
import RegisterLocation from './RegisterLocation'
import Locations from './Locations'
import RegisterMeetup from './RegisterMeetup'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';


class Page extends Component {

  constructor(props) {
    super(props);
    this.state = { open: false, index: 1, dialogOpen: false };
  }

  handleToggle = () => this.setState({ open: !this.state.open });
  handleClose = () => this.setState({ open: false });
  handleChange = (event, index, value) => {
    this.setState({ index: index, open: false });
  }

  handleOpenCreateEvent = () => {
    this.setState({ dialogOpen: true });
  }

  render() {
    let components = []

    if (this.state.index == 1) {
      // TODO: Add
      components.push(<CreateMeetup />)
    } else if (this.state.index == 2) {
      components.push(<RegisterSpeaker />)
      components.push(<Speakers />)    
    } else if (this.state.index == 3) {
      components.push(<RegisterLocation />)
      components.push(<Locations />)
    } else if (this.state.index == 4) {
      components.push(<RegisterParticipant />)
    }

    if (this.state.dialogOpen) {
      components.push(<RegisterMeetup />)
    }

    return (
      <div className="App">
        <MuiThemeProvider>
          <AppBar
            title="EVENTIFY"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonTouchTap={this.handleToggle} 
            onRightIconButtonTouchTap={this.handleOpenCreateEvent} 
            iconElementRight={<FlatButton label="Create event" />}/>
          <Drawer
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({ open })}>
            <Menu
              value={this.state.value}
              onChange={this.handleChange}>
              <MenuItem value={1}>Meetups</MenuItem>
              <MenuItem value={2}>Speakers</MenuItem>
              <MenuItem value={3}>Locations</MenuItem>
              <MenuItem value={4}>Participants</MenuItem>
            </Menu>
          </Drawer>
          {components}
        </MuiThemeProvider>
      </div>
    )
  }
}

export default Page
