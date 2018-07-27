import React from 'react'

const Notification = ({ className, msg }) => {
  if (msg) {
    return (<div className={className}>{msg}</div>)
  }
  return null
}

export default Notification
