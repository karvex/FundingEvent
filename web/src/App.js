import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Page from './Page'

class App extends Component {
  constructor() {
    super();

    var abi = JSON.parse('[{"constant":true,"inputs":[],"name":"GetSpeakers","outputs":[{"components":[{"name":"name","type":"string"},{"name":"bio","type":"string"},{"name":"url","type":"string"}],"name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"participants","outputs":[{"name":"name","type":"string"},{"name":"email","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"streetAddress","type":"string"},{"name":"cost","type":"uint256"},{"name":"capacity","type":"uint256"}],"name":"RegisterLocation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"email","type":"string"}],"name":"RegisterParticipant","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"GetMeetups","outputs":[{"components":[{"name":"creator","type":"address"},{"name":"title","type":"string"},{"name":"dateTicks","type":"uint256"},{"name":"speaker","type":"address"},{"name":"location","type":"address"}],"name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"bio","type":"string"},{"name":"url","type":"string"}],"name":"RegisterSpeaker","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"GetLocation","outputs":[{"components":[{"name":"streetAddress","type":"string"},{"name":"cost","type":"uint256"},{"name":"capacity","type":"uint256"}],"name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"locations","outputs":[{"name":"streetAddress","type":"string"},{"name":"cost","type":"uint256"},{"name":"capacity","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"Donate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"title","type":"string"},{"name":"blockTime","type":"uint256"},{"name":"speaker","type":"address"},{"name":"location","type":"address"}],"name":"CreateMeetup","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"speakers","outputs":[{"name":"name","type":"string"},{"name":"bio","type":"string"},{"name":"url","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')
    var contractAbi = window.web3.eth.contract(abi)
    window.signedInUser = window.web3.eth.accounts[0]
    window.contract = contractAbi.at('0xf46bc3bff9c18fa0b8c22ffa7ef594c093d02b4f')
  }

  render() {
    return (
      <div>
        <Route exact path='/' component={Page} />
      </div>
    );
  }
}

export default App;
