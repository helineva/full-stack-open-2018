const initialNotification = 'Welcome!';

const notificationReducer = (state = initialNotification, action) => {
  switch (action.type) {
  case 'SET':
    return action.notification;
  case 'UNSET':
    return '';
  default:
    return state;
  }
};

export const notificationSetter = (notification) => {
  return { type: 'SET', notification };
};

export const notificationUnsetter = () => {
  return { type: 'UNSET' };
};

export const notify = (notification, time) => {
  return async (dispatch) => {
    dispatch({ type: 'SET', notification });
    setTimeout(() => {
      dispatch({ type: 'UNSET' });
    }, time * 1000);
  };
};

export default notificationReducer;
