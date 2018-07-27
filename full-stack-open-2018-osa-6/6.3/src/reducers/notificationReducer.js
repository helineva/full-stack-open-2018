const initialNotification = 'This is a notification';

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

export default notificationReducer;
