const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000*Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const compare = (a1, a2) => {
  return a1.votes !== a2.votes
    ? a1.votes < a2.votes
    : a1.content > a2.content
}

const initialState = anecdotesAtStart.map(asObject).sort(compare)

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'CAST_VOTE':
      return state
        .map(anecdote => {
          return anecdote.id === action.id
            ? { ...anecdote, votes: anecdote.votes + 1 }
            : anecdote
          }
        )
        .sort(compare)
    case 'ADD_ANECDOTE':
      return [ ...state, asObject(action.content)].sort(compare)

    default:
      return state
  }
}

export default reducer
