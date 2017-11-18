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

  handleSubmit = (e) => {
    e.preventDefault();

    var web3 = window.web3;
    var abi = JSON.parse('[{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"bio","type":"string"},{"name":"url","type":"string"}],"name":"RegisterSpeaker","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"speakers","outputs":[{"name":"name","type":"string"},{"name":"bio","type":"string"},{"name":"url","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')
    var contract = web3.eth.contract(abi);
    var contractInstance = contract.at('0xf46bc3bff9c18fa0b8c22ffa7ef594c093d02b4f');

    contractInstance.RegisterSpeaker(this.state.name, this.state.bio, this.state.imageUrl, { from: web3.eth.accounts[0] }, function () {
      alert("success!");
    });
  }

  render() {
    return (
      <div className="RegisterSpeaker" style={{ display: "flex", flexDirection: "column" }}>
        <h1>Add Speaker</h1>
        <div className="AddSpeaker">
          <TextField
            name="name"
            type="text"
            placeholder="Name"
            onChange={this.handleChange}
            value={this.state.name}
            style={{ margin: 20 }} />
          
          <TextField
            name="bio"
            type="text"
            placeholder="Bio"
            onChange={this.handleChange}
            value={this.state.bio}
            style={{ margin: 20 }} />

          <TextField
            name="imageUrl"
            type="text"
            placeholder="Image url"
            onChange={this.handleChange}
            value={this.state.imageUrl}
            style={{ margin: 20 }} />

          <RaisedButton
            label="Submit"
            onClick={this.handleSubmit} />
        </div>
      </div>
    )
  }
}

export default RegisterSpeaker