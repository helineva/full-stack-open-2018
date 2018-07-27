const filterReducer = (state = '', action) => {
  switch (action.type) {
  case 'CHANGE':
    return action.filter.toLowerCase();
  default:
    return state;
  }
};

export const filterChange = (filter) => {
  return { type: 'CHANGE', filter };
};

export default filterReducer;
