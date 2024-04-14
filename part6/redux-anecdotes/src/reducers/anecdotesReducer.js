/*
 un reducer es una función a la que se le da el estado actual y una acción como parámetros.
  Devuelve un nuevo estado.
  */

const initialState = [
  { anecdote: "some random", votes: 0, id: 1 },
  { anecdote: "some random anecdte 2", votes: 0, id: 2 },
  { anecdote: "Juan Paredes", votes: 0, id: 3 },
];
const anecdotesReducer = (state = initialState, action) => {
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
      return state;
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
