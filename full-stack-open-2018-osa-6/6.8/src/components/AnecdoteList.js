import React from 'react';
import Filter from './Filter';
import { anecdoteVoting } from '../reducers/anecdoteReducer';
import { notificationSetter, notificationUnsetter } from '../reducers/notificationReducer';
import { connect } from 'react-redux';

class AnecdoteList extends React.Component {
  render() {
    const { anecdotes, filter } = this.props;
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
                this.props.anecdoteVoting(anecdote.id);
                this.props.notificationSetter(
                  `you voted '${anecdote.content}'`
                );
                setTimeout(() => {
                  this.props.notificationUnsetter();
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

const mapStateToProps = (state) => {
  return { anecdotes: state.anecdotes, filter: state.filter };
};

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  { anecdoteVoting, notificationSetter, notificationUnsetter }
)(AnecdoteList);

export default ConnectedAnecdoteList;
