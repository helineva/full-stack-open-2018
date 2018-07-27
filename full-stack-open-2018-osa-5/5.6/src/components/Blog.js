import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blog: props.blog,
      fullInfoVisible: false
    }
  }

  toggle = (event) => {
    this.setState({ fullInfoVisible: !this.state.fullInfoVisible })
  }

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    if (this.state.fullInfoVisible) {
      return (
        <div onClick={this.toggle} style={blogStyle}>
          <div>{this.state.blog.title} by {this.state.blog.author}</div>
          <a href={this.state.blog.url}>{this.state.blog.url}</a>
          <div>{this.state.blog.likes} likes
            <button>like</button>
          </div>
          <div>added by {this.state.blog.user.name}</div>
        </div>
      )
    }
    return (
      <div onClick={this.toggle} style={blogStyle}>
        {this.state.blog.title} {this.state.blog.author}
      </div>
    )
  }
}

export default Blog
