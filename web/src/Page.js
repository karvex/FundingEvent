import React, { Component } from 'react'
import './index.css'
import RegisterSpeaker from './RegisterSpeaker'
import Speakers from './Speakers'
import RegisterParticipant from './RegisterParticipant'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class Page extends Component {

  constructor(props) {
    super(props);
    this.state = { open: false, index: 1 };
  }

  handleToggle = () => this.setState({ open: !this.state.open });
  handleClose = () => this.setState({ open: false });
  handleChange = (event, index, value) => {
    this.setState({ index: index, open: false });
  }

  render() {
    let components = []

    if (this.state.index == 1) {
      // TODO: Add
    } else if (this.state.index == 2) {
      components.push(<RegisterSpeaker />)
      components.push(<Speakers />)
    } else if (this.state.index == 3) {
      // TODO: Add
    } else if (this.state.index == 4) {
      components.push(<RegisterParticipant />)
    }

    return (
      <div className="App">
        <MuiThemeProvider>
          <AppBar
            title="FundingEvent"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonTouchTap={this.handleToggle} />
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
