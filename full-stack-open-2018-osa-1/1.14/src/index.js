import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };
    const votes = new Array(this.props.anecdotes.length).fill(0);
    this.state['votes'] = votes;
  };

  nextAnecdote = () => {
    const r = Math.floor(Math.random() * this.props.anecdotes.length);
    this.setState({ selected: r});
  };

  voteAnecdote = () => {
    const votes_copy = [...this.state.votes];
    votes_copy[this.state.selected] += 1;
    this.setState({ votes: votes_copy });
  };

  mostVotes = () => {
    let max = 0;
    let maxIndex = 0;
    this.state.votes.forEach((value, index) => {
      if (value > max) {
        max = value;
        maxIndex = index;
      };
    });
    return maxIndex;
  };

  render() {
    const most = this.mostVotes();
    return (
      <div>
        <div>{this.props.anecdotes[this.state.selected]}</div>
        <div>has {this.state.votes[this.state.selected]} votes</div>
        <button onClick={this.voteAnecdote}>vote</button>
        <button onClick={this.nextAnecdote}>next anecdote</button>
        <h4>anecdote with most votes:</h4>
        <div>{this.props.anecdotes[most]}</div>
        <div>has {this.state.votes[most]} votes</div>
      </div>
    );
  };
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
);
