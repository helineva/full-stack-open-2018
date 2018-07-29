import userService from '../services/users'

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'INIT_USERS':
    return action.users;
  default:
    return state;
  }
};

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      users
    })
  }
}

export default userReducer;
