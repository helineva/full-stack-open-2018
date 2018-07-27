import React from 'react'
import BlogService from '../services/blogs'

class CreateBlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: ''
    }
  }

  createBlog = async (event) => {
    event.preventDefault();
    try {
      const blog = await BlogService.create({
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      })
      this.setState({
        title: '',
        author: '',
        url: ''
      })
      this.props.addBlog(blog)
    } catch (exception) {
      console.log(exception)
    }
  }


  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div>
        <h3>Create new blog</h3>
        <form onSubmit={this.createBlog}>
          <div>title:
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleFieldChange}
            />
          </div>
          <div>author:
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleFieldChange}
            />
          </div>
          <div>url:
            <input
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleFieldChange}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
}

export default CreateBlogForm
