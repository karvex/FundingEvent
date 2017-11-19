import React, { Component } from 'react'
import { List, ListItem, makeSelectable } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';


class Speakers extends Component {
  constructor(context) {
    super();
  }

  state = {
    speakers: [],
  }

  componentWillMount() {
    this.getSpeakers()
  }

  getSpeakers() {
    let _this = this;
    var speakers = []

    window.contract.getSpeakersCount({ from: window.signedInUser }, function (error, result) {
      var speakersCount = result.c[0]

      for (var i = 0; i < speakersCount; i++) {
        window.contract.getSpeaker(i, { from: window.signedInUser }, function (error, result) {
          if (result != null) {
            speakers.push({ name: result[0], bio: result[1], imageUrl: result[2] })
            _this.setState({
              speakers: speakers
            })
          }
        });
      }
    })
  }

  render() {
    let speakers = this.state.speakers;
    const speakerListItems = []
    for (var i = 0; i < speakers.length; i++) {
      speakerListItems.push(
        <ListItem
          value={i}
          primaryText={speakers[i].name}
          secondaryText={speakers[i].bio}
          leftAvatar={<Avatar src="images/kerem-128.jpg" />}
        />
      );
    }

    return (
      <div className="Speakers">
        <h1>Speakers</h1>
        {speakerListItems}
      </div>
    )
  }
}

export default Speakers