import anecdoteService from '../services/anecdotes';

const anecdoteReducer = (store = [], action) => {
  if (action.type==='UPDATE') {
    const old = store.filter(a => a.id !== action.data.id);
    return [...old, action.data];
  }
  if (action.type === 'CREATE') {
    return [...store, action.data];
  }
  if (action.type === 'INIT') {
    return action.anecdotes;
  }

  return store;
};

export const anecdoteUpdating = (newAnecdote) => {
  return async (dispatch) => {
    const response = await anecdoteService.update(newAnecdote);
    dispatch({ type: 'UPDATE', data: response });
  };
};

export const anecdoteCreation = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content);
    dispatch({ type: 'CREATE', data: newAnecdote });
  };
};

export const anecdoteInit = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({ type: 'INIT', anecdotes });
  };
};

export default anecdoteReducer;
