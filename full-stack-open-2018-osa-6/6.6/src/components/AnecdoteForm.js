import React from 'react';
import { anecdoteCreation } from '../reducers/anecdoteReducer';
import { notificationSetter, notificationUnsetter } from '../reducers/notificationReducer';

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    this.props.store.dispatch(anecdoteCreation(content));
    this.props.store.dispatch(notificationSetter(
      `you created '${content}'`
    ));
    setTimeout(() => {
      this.props.store.dispatch(notificationUnsetter());
    }, 5000);

    e.target.anecdote.value = '';
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    );
  }
}

export default AnecdoteForm;
