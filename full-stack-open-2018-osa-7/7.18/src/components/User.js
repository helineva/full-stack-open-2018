import React from 'react';
import { connect } from 'react-redux';
import { List, Segment } from 'semantic-ui-react';

class User extends React.Component {
  render() {
    if (this.props.user) {
      const style = {
        fontWeight: 'bold',
        fontSize: 20
      };

      return (
        <div>
          <Segment style={style}>{this.props.user.name}</Segment>
          <h3>Added blogs</h3>
          <List bulleted>
            {this.props.user.blogs.map(blog =>
              <List.Item key={blog._id}>{blog.title} by {blog.author}</List.Item>
            )}
          </List>
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = (state, props) => {
  if (!state.users) {
    return { user: null };
  }
  const user = state.users.filter(user =>
    user._id === props.userId)[0];
  return { user };
};

export default connect(mapStateToProps)(User);
