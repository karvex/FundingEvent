import React, { Component } from 'react'
// import './index.css';
import { Card, CardHeader, CardText, CardActions, CardTitle } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'


class RegisterSpeaker extends Component {
  constructor(context) {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    posts: [],
    loading: true,
    name: '',
    bio: '',
    imageUrl: ''
  }

  componentWillMount() {

    this.getPosts()
  }

  getPosts() {
    this.setState({
        posts: [],
        loading: false
      })
  }

  handleChange = (e) => {
    this.setState({
      message: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const web3Context = context.web3;
    var web3 = web3Context.currentProvider;
    
    var abi = JSON.parse('[{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"bio","type":"string"},{"name":"url","type":"string"}],"name":"RegisterSpeaker","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"speakers","outputs":[{"name":"name","type":"string"},{"name":"bio","type":"string"},{"name":"url","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')
    var contract = web3.eth.contract(abi);
    // In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
    var contractInstance = contract.at('0xf46bc3bff9c18fa0b8c22ffa7ef594c093d02b4f');
    
    contractInstance.RegisterSpeaker(this.state.name, this.state.bio, this.state.imageUrl);

    //var allPosts = this.state.posts
    //allPosts.push({title: this.state.message, message: this.state.message })

    this.setState({
        posts: allPosts
       });
  }

  render() {
    let posts = this.state.posts;

    if (!posts) {
      return false;
    }

    if (this.state.loading) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    return (
      <div className="RegisterSpeaker" style={{ display: "flex", flexDirection: "column" }}>
        <div className="AddPost">
          <TextField
            type="text"
            placeholder="Enter your name"
            onChange={this.handleChange}
            value={this.state.name}
            style={{ margin: 20 }} />
          
          <TextField
            type="text"
            placeholder="Enter some bio"
            onChange={this.handleChange}
            value={this.state.bio}
            style={{ margin: 20 }} />  

          <TextField
            type="text"
            placeholder="Enter a image url"
            onChange={this.handleChange}
            value={this.state.imageUrl}
            style={{ margin: 20 }} />  

          <RaisedButton
            label="Submit"
            onClick={this.handleSubmit} />
        </div>
        {Object.keys(posts).map(function (key) {
          return (
            <div key={key} style={{ display: "flex", justifyContent: "center", textAlign: "center" }}>
              <Card style={{ margin: 20, width: "80%" }}>
                <CardTitle title={posts[key].title} />
              </Card>
            </div>
          );
        })}
      </div>
    )
  }
}

export default RegisterSpeaker