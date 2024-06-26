import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes';

export const getAnecdotes = () =>
  axios.get(baseURL).then(res => res.data)

  export const createAnecdote = (anecdote) =>  {
    axios.post(baseURL, anecdote).then(res => res.data);
  }

  export const updateAnecdote = anecdote => {
    axios.put(`${baseURL}/${anecdote.id}`, anecdote).then(res => res.data);
  }

  export const voteAnecdote = (anecdote) => {
    axios.put(`${baseURL}/${anecdote.id}`, anecdote).then(res =>  res.data);
  }