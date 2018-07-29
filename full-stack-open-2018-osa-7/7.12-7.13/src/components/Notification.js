import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ className, msg }) => {
  if (msg) {
    return (<div className={className}>{msg}</div>)
  }
  return null
}

const mapStateToProps = (state) => {
  return {
    className: state.notification.notificationClass,
    msg: state.notification.notificationMsg
  }
}

export default connect(mapStateToProps)(Notification)
