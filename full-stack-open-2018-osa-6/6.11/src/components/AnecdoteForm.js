import React from 'react';
import { anecdoteCreation } from '../reducers/anecdoteReducer';
import { notificationSetter, notificationUnsetter } from '../reducers/notificationReducer';
import { connect } from 'react-redux';
import anecdoteService from '../services/anecdotes';

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';
    const newAnecdote = await anecdoteService.create(content);
    this.props.anecdoteCreation(newAnecdote);
    this.props.notificationSetter(
      `you created '${content}'`
    );
    setTimeout(() => {
      this.props.notificationUnsetter();
    }, 5000);
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

const ConnectedAnecdoteForm = connect(
  null,
  { anecdoteCreation, notificationSetter, notificationUnsetter }
)(AnecdoteForm);

export default ConnectedAnecdoteForm;
