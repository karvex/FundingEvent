import React, { Component, PropTypes } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import Avatar from 'material-ui/Avatar';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';

let SelectableList = makeSelectable(List);

export default class RegisterMeetup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 1,
            dialogOpen: true,
            name: "",
            date: "",
            speakers: [],
            selectedSpeaker: 0,
            locations: [],
            selectedLocation: 0
        };
    }

    componentWillMount() {
        this.getSpeakers()
        this.getLocations()
    }

    handleRequestChange(event, index) {
        this.setState({
            selectedIndex: index
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleDateChange = (arg, date) => {
        var unixtime = Date.parse(date) / 1000
        this.setState({
            "date": unixtime
        });
    }

    handleCreate = () => {
        this.setState({ dialogOpen: false });

        window.contract.createMeetup(this.state.name, this.state.date, this.state.selectedSpeaker, this.state.selectedLocation, { from: window.signedInUser }, function (error, result) {
            if (error) {
                alert(error)
            } else {
                alert(result)
            }
        });
    };

    handleClose = () => {
        this.setState({ dialogOpen: false });
    };

    handleSpeakerChange = (event, index, value) => {
        this.setState({ selectedSpeaker: value });
    };

    handleLocationChange = (event, index, value) => {
        this.setState({ selectedLocation: value });
    };

    getSpeakers() {
        let _this = this;
        var speakers = []

        window.contract.getSpeakerCount({ from: window.signedInUser }, function (error, result) {
            var speakersCount = result.c[0]

            for (var i = 0; i < speakersCount; i++) {
                window.contract.getSpeaker(i, { from: window.signedInUser }, function (error, result) {
                    if (result != null) {
                        speakers.push({ name: result[0], address: result[1], bio: result[2], imageUrl: result[3] })
                        _this.setState({
                            speakers: speakers
                        })
                    }
                });
            }
        })
    }

    getLocations() {
        let _this = this;
        var locations = []

        window.contract.getLocationCount({ from: window.signedInUser }, function (error, result) {
            var locationCount = result.c[0]

            for (var i = 0; i < locationCount; i++) {
                window.contract.getLocation(i, { from: window.signedInUser }, function (error, result) {
                    if (result != null) {
                        locations.push({ streetAddress: result[0], address: result[1], cost: result[2], capacity: result[3] })
                        _this.setState({
                            locations: locations
                        })
                    }
                });
            }
        })
    }

    render() {
        return (<div>{this.renderAside()}</div>);
    }

    renderAside() {
        let speakers = this.state.speakers
        let locations = this.state.locations

        const speakerMenuItems = []

        speakerMenuItems.push(
            <MenuItem
                value={0}
                primaryText={"Select speaker"}
            />
        );

        for (var i = 0; i < speakers.length; i++) {
            speakerMenuItems.push(
                <MenuItem
                    value={speakers[i].address}
                    primaryText={speakers[i].name}
                />
            );
        }

        const locationMenuItems = []

        locationMenuItems.push(
            <MenuItem
                value={0}
                primaryText={"Select location"}
            />
        );

        for (var i = 0; i < locations.length; i++) {
            locationMenuItems.push(
                <MenuItem
                    value={locations[i].address}
                    primaryText={locations[i].streetAddress}
                />
            );
        }

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Crate event"
                primary={true}
                disabled={false}
                onClick={this.handleCreate}
            />,
        ];

        return (
            <div className="RegisterParticipant" style={{ display: "flex", flexDirection: "column" }}>
                <div className="RegisterParticipant">
                    <Dialog
                        title="Create Event"
                        actions={actions}
                        modal={true}
                        open={this.state.dialogOpen}>
                        <DropDownMenu
                            name="speaker"
                            value={this.state.selectedSpeaker}
                            onChange={this.handleSpeakerChange}
                            openImmediately={false}>
                            {speakerMenuItems}
                        </DropDownMenu>
                        <br />
                        <DropDownMenu
                            name="location"
                            value={this.state.selectedLocation}
                            onChange={this.handleLocationChange}
                            openImmediately={false}>
                            {locationMenuItems}
                        </DropDownMenu>
                        <br />
                        <TextField
                            name="name"
                            type="text"
                            placeholder="Title"
                            onChange={this.handleChange}
                            value={this.state.name}
                            style={{ margin: 20 }} />

                        <DatePicker
                            name="date"
                            hintText="Date"
                            mode="landscape"
                            onChange={this.handleDateChange}
                            style={{ margin: 20 }} />
                    </Dialog>
                </div>
            </div>);
    }
}