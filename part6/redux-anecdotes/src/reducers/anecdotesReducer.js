/*
 un reducer es una función a la que se le da el estado actual y una acción como parámetros.
  Devuelve un nuevo estado.
  */

//new way of doing redux
import { createSlice, current } from "@reduxjs/toolkit";

const initialState = [
  { anecdote: "some random", votes: 0, id: 1, important: false },
  { anecdote: "some random anecdte 2", votes: 0, id: 2, important: false },
  { anecdote: "Juan Paredes", votes: 0, id: 3, important: true },
];

//new way of doing redux
const noteSlice = createSlice({
  name: "anecdotes",
  initialState, 
  reducers: {
    createAnecdote(state,action) {
      //data comming
      const content = action.payload;

      console.log(current(state) , "state inical create")

      //logic
       state.push({
        content,
        important: false,
        id: generateId()
      })
    },
    toggleImportance(state,action){
       //data comming
      const idToToggle = action.payload;
      //logic
      const anecdoteToChange = state.find(anec => anec.id === idToToggle);
      const changedAnecdote = {
        ...anecdoteToChange,
        important: !anecdoteToChange.important
      }

      return state.map(anec => anec.id != id ? anec :  changedAnecdote)
    }
  }
});

export const { createAnecdote, toggleImportanceOf } = noteSlice.actions;
export default noteSlice.reducer;


//

// const anecdotesReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "ADD":
//       console.log(state, "estado incial");
//       return [...state, action.payload];

//     case "VOTE":
//       //get the value given in the payload
//       const id = action.payload.id;
//       //find wich anecdote u want to vote
//       const noteToVote = state.find((a) => a.id === id);
//       console.log(noteToVote, "noteVOTE");
//       const votedAnecdote = {
//         ...noteToVote,
//         votes: noteToVote.votes + 1,
//       };

//       return state.map((anec) => (anec.id !== id ? anec : votedAnecdote));

//     default:
//       return state;
//   }
// };
//aux function
const generateId = () => Number((Math.random() * 1000000).toFixed(0));

//ACTION CREATORS

// export const addAnecdote = (anecdote) => {
//   return {
//     type: "ADD",
//     payload: {
//       anecdote,
//       id: generateId(),
//       votes: 0,
//     },
//   };
// };

export const voteAnecdote = (id) => {
  return {
    type: "VOTE",
    payload: { id },
  };
};

//export default anecdotesReducer;
