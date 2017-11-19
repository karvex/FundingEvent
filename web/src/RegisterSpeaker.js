import React, { Component } from 'react'
import { Card, CardHeader, CardText, CardActions, CardTitle } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'


class RegisterSpeaker extends Component {
  constructor(context) {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    name: '',
    bio: '',
    imageUrl: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    var _this = this

    window.contract.registerSpeaker(this.state.name, this.state.bio, this.state.imageUrl, { from: window.signedInUser }, function (error, result) {
      if (error) {
        alert(error)
      } else {
        alert(result)
        _this.setState({name: '', bio: '', imageUrl: ''})
      }
    });
  }

  render() {
    return (
      <div className="RegisterSpeaker">
        <h1>Add Speaker</h1>
        <div className="AddSpeaker">
          <TextField
            name="name"
            type="text"
            placeholder="Name"
            onChange={this.handleChange}
            value={this.state.name}
            style={{ margin: 20 }} />
          <br />
          <TextField
            name="bio"
            type="text"
            placeholder="Bio"
            onChange={this.handleChange}
            value={this.state.bio}
            style={{ margin: 20 }} />
          <br />
          <TextField
            name="imageUrl"
            type="text"
            placeholder="Image url"
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

export default RegisterSpeaker