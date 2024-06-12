import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
}

const createAnecdote = async (anecdote) => {
    const object = {
        content: anecdote,
        important: false
    }

    const response = await axios.post(baseUrl,object);
    return response.data;
}

export default {getAll, createAnecdote};