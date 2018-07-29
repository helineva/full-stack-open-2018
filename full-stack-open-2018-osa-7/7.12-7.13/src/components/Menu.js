import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

const Menu = ({ user, logout }) => {
  const style = {
    backgroundColor: 'lightGrey',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20
  }
  const activeStyle = {
    fontWeight: 'bold'
  }
  return (
    <div style={style}>
      <NavLink to="/blogs" activeStyle={activeStyle}>blogs</NavLink>&emsp;
      <NavLink to='/users' activeStyle={activeStyle}>users</NavLink>&emsp;
      <span>{user.name} logged in&emsp;
        <Button onClick={logout}>logout</Button>
      </span>
    </div>
  )
}

export default Menu
