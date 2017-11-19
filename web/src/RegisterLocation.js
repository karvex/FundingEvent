import React, { Component } from 'react'
import { Card, CardHeader, CardText, CardActions, CardTitle } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'


class RegisterLocation extends Component {
  constructor(context) {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    streetAddress: '',
    cost: '',
    capacity: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    window.contract.registerLocation(this.state.streetAddress, this.state.cost, this.state.capacity, { from: window.signedInUser }, function (error, result) {
      alert("success!");
    });
  }

  render() {
    return (
      <div className="RegisterLocation">
        <h1>Add Location</h1>
        <div className="AddLocation">
          <TextField
            name="streetAddress"
            type="text"
            placeholder="Address"
            onChange={this.handleChange}
            value={this.state.streetAddress}
            style={{ margin: 20 }} />
          <br />
          <TextField
            name="cost"
            type="text"
            placeholder="Cost"
            onChange={this.handleChange}
            value={this.state.cost}
            style={{ margin: 20 }} />
          <br />
          <TextField
            name="capacity"
            type="text"
            placeholder="capacity"
            onChange={this.handleChange}
            value={this.state.imageUrl}
            style={{ margin: 20 }} />
          <br />
          <RaisedButton
            label="Submit"
            onClick={this.handleSubmit}
            style={{ margin: 20 }} />
        </div>
      </div>
    )
  }
}

export default RegisterLocation