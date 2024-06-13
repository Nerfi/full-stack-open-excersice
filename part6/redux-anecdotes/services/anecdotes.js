import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createAnecdote = async (anecdote) => {
  const object = {
    content: anecdote,
    important: false,
  };

  const response = await axios.post(baseUrl, object);
  return response.data;
};

const vote = async (id, state) => {
  //post request to anecdote with such id
  const updateURL = `http://localhost:3001/anecdotes/${id}`;

  const findAnec = state.find((a) => a.id === id);
  //console.log(findAnec.votes, "findede anec")
  const updateVote = {
    ...findAnec,
    votes: findAnec.votes + 1,
  };

  const response = await axios.put(updateURL, updateVote);

  console.log(response.data, "vote func")
  return response.data;
};

export default { getAll, createAnecdote, vote };
