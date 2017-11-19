import React, { Component } from 'react'
import { List, ListItem, makeSelectable } from 'material-ui/List';


class Locations extends Component {
  constructor(context) {
    super();
  }

  state = {
    locations: [],
  }

  componentWillMount() {
    this.getLocations()
  }

  getLocations() {
    let _this = this;
    var locations = []

    window.contract.getLocationCount({ from: window.signedInUser }, function (error, result) {
      var locationCount = result.c[0]

      for (var i = 0; i < locationCount; i++) {
        window.contract.getLocation(i, { from: window.signedInUser }, function (error, result) {
          if (result != null) {
            locations.push({ streetAddress: result[0], cost: result[1], capacity: result[2] })
            _this.setState({
              locations: locations
            })
          }
        });
      }
    })
  }

  render() {
    let locations = this.state.locations;
    const locationListItems = []
    for (var i = 0; i < locations.length; i++) {
      locationListItems.push(
        <ListItem
          value={i}
          primaryText={locations[i].streetAddress}
          secondaryText={"Cost: " + locations[i].cost + ", Capacity: " + locations[i].capacity}
        />
      );
    }

    return (
      <div className="Locations">
        <h1>Locations</h1>
        {locationListItems}
      </div>
    )
  }
}

export default Locations