const initialState = {
  notificationClass: '',
  notificationMsg: ''
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification;
  case 'UNSET_NOTIFICATION':
    return initialState;
  default:
    return state;
  }
};

export const notificationSetter = (notification) => {
  return { type: 'SET_NOTIFICATION', notification };
};

export const notificationUnsetter = () => {
  return { type: 'UNSET_NOTIFICATION' };
};

export const notify = (notificationMsg, notificationClass, time) => {
  const notification = {
    notificationClass,
    notificationMsg
  };
  return async (dispatch) => {
    dispatch(notificationSetter(notification));
    setTimeout(() => {
      dispatch(notificationUnsetter());
    }, time * 1000);
  };
};

export default notificationReducer;
