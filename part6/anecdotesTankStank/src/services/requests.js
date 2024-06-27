import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes';

export const getAnecdotes = () =>
  axios.get(baseURL).then(res => res.data)

  export const createAnecdote = async  (anecdote) =>  {
    try {
      return await axios.post(baseURL, anecdote).then(res => res.data);  
    } catch (error) {
      console.log(error.response.data.error, "error in request archivo")
      throw error.response.data.error;
    }
    
  }

  export const updateAnecdote = anecdote => {
    axios.put(`${baseURL}/${anecdote.id}`, anecdote).then(res => res.data);
  }

  export const voteAnecdote = (anecdote) => {
    axios.put(`${baseURL}/${anecdote.id}`, anecdote).then(res =>  res.data);
  }