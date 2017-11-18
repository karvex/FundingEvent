import React, { Component } from 'react'
import { Card, CardHeader, CardText, CardActions, CardTitle } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'


class RegisterParticipant extends Component {
  constructor(context) {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    name: '',
    email: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    window.contract.RegisterParticipant(this.state.name, this.state.email, { from: window.signedInUser }, function () {
      alert("success!");
    });
  }

  render() {
    return (
      <div className="RegisterParticipant" style={{ display: "flex", flexDirection: "column" }}>
        <h1>Register Participant</h1>
        <div className="RegisterParticipant">
          <TextField
            name="name"
            type="text"
            placeholder="Name"
            onChange={this.handleChange}
            value={this.state.name}
            style={{ margin: 20 }} />
          
          <TextField
            name="email"
            type="text"
            placeholder="Email"
            onChange={this.handleChange}
            value={this.state.bio}
            style={{ margin: 20 }} />

          <RaisedButton
            label="Submit"
            onClick={this.handleSubmit} />
        </div>
      </div>
    )
  }
}

export default RegisterParticipant