import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload.id
      const anecdoteToVote = state.find(n => n.id === id)
      anecdoteToVote.votes += 1
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
  }
})

export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export { asObject }

export const initializeAnecdotes = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll()
    dispatch(setAnecdotes(notes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newNote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newNote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    await anecdoteService.update(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 })
    dispatch(vote(anecdote))
  }
}

export default anecdoteSlice.reducer