import React, { Component } from 'react'
// import './index.css';
import { Card, CardHeader, CardText, CardActions, CardTitle } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

class Posts extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    posts: [],
    loading: true,
    message: ''
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

    var allPosts = this.state.posts
    allPosts.push({title: this.state.message, message: this.state.message })

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
      <div className="Posts" style={{ display: "flex", flexDirection: "column" }}>
        <div className="AddPost">
          <TextField
            type="text"
            placeholder="Enter your message"
            onChange={this.handleChange}
            value={this.state.message}
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

export default Posts