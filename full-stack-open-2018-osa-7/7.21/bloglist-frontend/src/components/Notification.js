import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Notification = ({ className, msg }) => {
  if (msg) {
    return (<div className={className}>{msg}</div>);
  }
  return null;
};

const mapStateToProps = (state) => {
  return {
    className: state.notification.notificationClass,
    msg: state.notification.notificationMsg
  };
};

Notification.propTypes = {
  className: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired
}

export default connect(mapStateToProps)(Notification);
