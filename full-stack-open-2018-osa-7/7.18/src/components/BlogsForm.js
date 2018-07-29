import React from 'react';
import CreateBlogForm from './CreateBlogForm';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

class BlogsForm extends React.Component {
  render() {
    if (this.props.blogs) {
      return (
        <div>
          <h2>blogs</h2>
          <Table striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Author</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.blogs.map(blog =>
                <Table.Row key={blog._id}>
                  <Table.Cell>
                    <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
                  </Table.Cell>
                  <Table.Cell>
                    {blog.author}
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
          <CreateBlogForm />
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = (state) => {
  return { blogs: state.blogs };
};

export default connect(mapStateToProps)(BlogsForm);
