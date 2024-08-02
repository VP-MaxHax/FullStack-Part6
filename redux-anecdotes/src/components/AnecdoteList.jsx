import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import PropTypes from 'prop-types';

const style = {
  border: 'solid',
  padding: 10,
  borderWidth: 1
}

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

Anecdote.propTypes = {
  anecdote: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired
  }).isRequired,
  handleClick: PropTypes.func.isRequired
}
    
const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    const filter = state.filter.toLowerCase()
    return state.anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase().includes(filter)
    )
  })

  const dispatch = useDispatch()

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  return (
    <div style={style}>
      {sortedAnecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(voteAnecdote(anecdote))
            dispatch(notify(`you voted '${anecdote.content}'`, 10))
          }
          }
        />
      )}
    </div>
  )
}

export default AnecdoteList