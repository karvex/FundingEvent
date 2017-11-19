import React, { Component, PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

let SelectableList = makeSelectable(List);

export default class RegisterMeetup extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            selectedIndex: 1, 
            dialogOpen: true, 
            name: "",
            dateTime: ""
         };
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

    handleCreate = () => {
        this.setState({ dialogOpen: false });
        window.contract.createMeetup(this.state.name, 0, 0, 0, { from: window.signedInUser }, function () {
            this.handleClose()
          });
    };

    handleClose = () => {
        this.setState({ dialogOpen: false });
    };

    render() {
        return (<div>{this.renderAside()}</div>);
    }

    renderAside() {
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
                        <TextField
                            name="name"
                            type="text"
                            placeholder="Title"
                            onChange={this.handleChange}
                            value={this.state.name}
                            style={{ margin: 20 }} />

                        <DatePicker hintText="Date" mode="landscape" style={{ margin: 20 }} />
                    </Dialog>
                </div>
            </div>);
    }
}