/*
 un reducer es una función a la que se le da el estado actual y una acción como parámetros.
  Devuelve un nuevo estado.
  */
const anecdotesReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD":
      console.log(state, "estado incial");
      return [...state, action.payload];

    case "VOTE":
      //get the value given in the payload
      const id = action.payload.id;
      //find wich anecdote u want to vote
      const noteToVote = state.find((a) => a.id === id);
      console.log(noteToVote, "noteVOTE");
      const votedAnecdote = {
        ...noteToVote,
        votes: noteToVote.votes + 1,
      };

      return state.map((anec) => (anec.id !== id ? anec : votedAnecdote));

    default:
      break;
  }
};
//aux function
const generateId = () => Number((Math.random() * 1000000).toFixed(0));

//ACTION CREATORS

export const addAnecdote = (anecdote) => {
  return {
    type: "ADD",
    payload: {
      anecdote,
      id: generateId(),
      votes: 0,
    },
  };
};

export const voteAnecdote = (id) => {
  return {
    type: "VOTE",
    payload: { id },
  };
};

export default anecdotesReducer;
