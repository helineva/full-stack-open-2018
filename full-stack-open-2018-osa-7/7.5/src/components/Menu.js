import React from 'react'
import { NavLink, Prompt } from 'react-router-dom'

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
        <button onClick={logout}>logout</button>
      </span>
    </div>
  )
}

export default Menu
