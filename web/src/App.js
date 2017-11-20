import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Page from './Page'

class App extends Component {
  constructor() {
    super();

    var abi = JSON.parse('[{"constant":false,"inputs":[{"name":"meetup","type":"address"}],"name":"donate","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getSpeakers","outputs":[{"components":[{"name":"owner","type":"address"},{"name":"name","type":"string"},{"name":"bio","type":"string"},{"name":"url","type":"string"}],"name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getMeetup","outputs":[{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMeetupCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getLocation","outputs":[{"name":"","type":"string"},{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"bio","type":"string"},{"name":"url","type":"string"}],"name":"registerSpeaker","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"title","type":"string"},{"name":"blockTime","type":"uint256"},{"name":"speaker","type":"address"},{"name":"location","type":"address"}],"name":"createMeetup","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getLocationCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getSpeakerCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"meetup","type":"address"}],"name":"participantWithdrawal","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"email","type":"string"}],"name":"registerParticipant","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"meetup","type":"address"},{"name":"minAmount","type":"uint256"}],"name":"setMinMeetupAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"streetAddress","type":"string"},{"name":"cost","type":"uint256"},{"name":"capacity","type":"uint256"}],"name":"registerLocation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"meetup","type":"address"}],"name":"speakerWithdrawal","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getSpeaker","outputs":[{"name":"","type":"string"},{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]')
    var contractAbi = window.web3.eth.contract(abi)
    window.signedInUser = window.web3.eth.accounts[0]
    window.contract = contractAbi.at('0x81bceca9ca360aa891602c0efb2c421afc462e91')
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
