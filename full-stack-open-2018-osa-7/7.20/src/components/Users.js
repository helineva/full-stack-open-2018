import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class Users extends React.Component {
  render() {
    if (this.props.users) {
      return (
        <div>
          <h2>users</h2>
          <Table striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>user</Table.HeaderCell>
                <Table.HeaderCell>blogs added</Table.HeaderCell>
                <Table.HeaderCell>adult</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.users.map(user =>
                <Table.Row key={user._id}>
                  <Table.Cell><Link to={`/users/${user._id}`}>{user.name}</Link></Table.Cell>
                  <Table.Cell>{user.blogs.length}</Table.Cell>
                  <Table.Cell>{user.adult ? 'yes' : 'no'}</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = (state) => {
  return { users: state.users };
};

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    adult: PropTypes.bool.isRequired,
    blogs: PropTypes.array.isRequired
  })).isRequired
};

export default connect(mapStateToProps)(Users);
