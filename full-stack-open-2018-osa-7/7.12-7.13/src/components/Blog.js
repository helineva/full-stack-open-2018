import React from 'react'
import CommentsForm from './CommentsForm'
import { connect } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { Button, List, Segment } from 'semantic-ui-react'

class Blog extends React.Component {
  like = (event) => {
    this.props.likeBlog(this.props.blog)
  }

  delete = (event) => {
    if (window.confirm(
      `delete '${this.props.blog.title}' by ${this.props.blog.author}?`)) {
        try {
          this.props.deleteBlog()
          this.props.history.push('/blogs')
        } catch (exception) {
          console.log(exception)
        }
    }
  }

  render() {
    const style = {
      fontWeight: 'bold',
      fontSize: 20
    }
    if (this.props.blog) {
      return (
        <div>
          <Segment style={style}>{this.props.blog.title} by {this.props.blog.author}</Segment>
          <List style={{ marginLeft: 20 }}>
            <List.Item><a href={this.props.blog.url}>{this.props.blog.url}</a></List.Item>
            <List.Item>
              {this.props.blog.likes} likes
              <Button
                onClick={this.like}
                style={{ marginLeft: 10 }}>
                  like
              </Button>
            </List.Item>
            <List.Item>added by {this.props.blog.user !== undefined
              ? this.props.blog.user.name : '<undefined>'}</List.Item>
          </List>
          {(this.props.blog.user === undefined || this.props.blog.user._id === this.props.user.id)
              && <Button onClick={this.delete}>
                   delete
                </Button>
          }
          <CommentsForm blogId={this.props.blog._id} />
        </div>
      )
    }
    return null
  }
}

const mapStateToProps = (state, props) => {
  if (!state.blogs) {
    return { blog: null, user: state.login.user }
  }
  const blog = state.blogs.filter(blog =>
    blog._id === props.blogId)[0]
  return { blog, user: state.login.user }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    likeBlog: (blog) => dispatch(likeBlog(blog)),
    deleteBlog: (id) => dispatch(deleteBlog(props.blogId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Blog)
