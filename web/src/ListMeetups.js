import React, { Component } from 'react'
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import FlatButton from 'material-ui/FlatButton';

class ListMeetups extends Component {
  constructor(context) {
    super();
  }

  render() {
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        width: 700,
        overflowY: 'auto',
      },
    };

    var meetupListData = [
      {
        img: 'https://pi.tedcdn.com/r/pe.tedcdn.com/images/ted/5ab70a8813bed2fe065ca7534513866145155873_2880x1620.jpg?quality=95&w=480',
        title: "Why do I make art? To build time capsules for my heritage?",
        speaker: 'Anna Johnson'
      },
      {
        img: 'http://image.pbs.org/video-assets/pbs/ted-talks/209634/images/mezzanine_243.jpg.resize.800x450.jpg',
        title: "How to transform apocalypse fatigue into action on global warming?",
        speaker: 'Maria Boss',
      },
      {
        img: 'https://pi.tedcdn.com/r/pe.tedcdn.com/images/ted/25a5bc18d2472308c8ed2bb401b4a497f49a0265_1600x1200.jpg?quality=89&w=800',
        title: "What I learned serving time for a crime I didn't commit?",
        speaker: 'Sandra Maple',
      },
      {
        img: 'https://pi.tedcdn.com/r/pe.tedcdn.com/images/ted/110884_800x600.jpg?w=1200',
        title: "How judges can show respect?",
        speaker: 'John Leek',
      },
    ];

    return (
      <div className="ListMeetups">
        <br/>
        <div style={styles.root}>
          <GridList
            cellHeight={180}
            style={styles.gridList}>
            {meetupListData.map((meetup) => (
              <GridTile
                key={meetup.img}
                title={meetup.title}
                subtitle={<span>by <b>{meetup.speaker}</b></span>}
                actionIcon={<FlatButton label="Send funds" primary={true} />}>
                <img src={meetup.img} />
              </GridTile>
            ))}
          </GridList>
        </div>
      </div>
    )
  }
}

export default ListMeetups