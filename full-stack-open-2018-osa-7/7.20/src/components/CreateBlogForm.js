import React from 'react';
import { createBlog } from '../reducers/blogReducer';
import { notify } from '../reducers/notificationReducer';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class CreateBlogForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      url: '',
      createBlogFormVisible: false
    };
  }

  create = (event) => {
    event.preventDefault();
    try {
      this.props.createBlog(
        this.state.title,
        this.state.author,
        this.state.url
      );
      const msg = `a new blog '${this.state.title}' by ${this.state.author} added`;
      this.props.notify(msg, 'note', 5);
      this.setState({
        title: '',
        author: '',
        url: '',
        createBlogFormVisible: false
      });
    } catch (exception) {
      console.log(exception);
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    if (this.state.createBlogFormVisible) {
      return (
        <div>
          <h3>Create new blog</h3>
          <Form onSubmit={this.create}>
            <label>title</label>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleFieldChange}
            />
            <label>author</label>
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleFieldChange}
            />
            <label>url</label>
            <input
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleFieldChange}
            />
            <Button type="submit">create</Button>
          </Form>
          <Button onClick={e => this.setState({ createBlogFormVisible: false })}>
            cancel
          </Button>
        </div>
      );
    }
    return (
      <div>
        <Button onClick={e => this.setState({ createBlogFormVisible: true })}>
          create new blog
        </Button>
      </div>
    );
  }
}

CreateBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired
}

export default connect(
  null,
  { createBlog, notify })(CreateBlogForm);
