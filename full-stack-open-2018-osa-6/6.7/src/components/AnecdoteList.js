import React from 'react';
import Filter from './Filter';
import { anecdoteVoting } from '../reducers/anecdoteReducer';
import { notificationSetter, notificationUnsetter } from '../reducers/notificationReducer';

class AnecdoteList extends React.Component {

  render() {
    const { anecdotes, filter } = this.props.store.getState();
    const filteredAnecdotes = anecdotes
      .filter(anecdote => anecdote.content.toLowerCase().includes(filter));
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {filteredAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                this.props.store.dispatch(anecdoteVoting(anecdote.id));
                this.props.store.dispatch(notificationSetter(
                  `you voted '${anecdote.content}'`
                ));
                setTimeout(() => {
                  this.props.store.dispatch(notificationUnsetter());
                }, 5000);
              }}>vote
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default AnecdoteList;
