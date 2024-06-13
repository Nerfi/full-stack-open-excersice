/*
 un reducer es una función a la que se le da el estado actual y una acción como parámetros.
  Devuelve un nuevo estado.
  */

//new way of doing redux
import { createSlice, current } from "@reduxjs/toolkit";
import anecdotesService from "../../services/anecdotes";

// const initialState = [
//   { anecdote: "some random", votes: 0, id: 1, important: false },
//   { anecdote: "some random anecdte 2", votes: 0, id: 2, important: false },
//   { anecdote: "Juan Paredes", votes: 0, id: 3, important: true },
// ];

//new way of doing redux
const noteSlice = createSlice({
  name: "anecdotes",
  initialState: [], 
  reducers: {
    // createAnecdote(state,action) {
    //   //data comming
    //   const anecdote = action.payload;

    //   //console.log(current(anecdote) , "state inical create")

    //   //logic
    //    state.push(anecdote);
    // },
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
    },

    filterByText(state,action) {
      
      if(action.payload != "") {
        const anecdotes = [...state].filter(txt => txt.anecdote.toLowerCase().includes(action.payload.toLowerCase()));
        return anecdotes;
      }

      return initialState;
     
    },
    voteAnecdote(state, action) {
      // const id = action.payload;
      //  //find wich anecdote u want to vote
      //  const noteToVote = state.find((a) => a.id === id);
      //  //update the value 
      //  const votedAnecdote = {
      //   ...noteToVote,
      //   votes: noteToVote.votes + 1 
      //  }

      //  //sustituye
      //  return state.map(anec => anec.id !== id ? anec : votedAnecdote);

      //thunk way 
      const id = action.payload.id;


      const updatedState = state.map(anecdote =>
        anecdote.id !== id ? anecdote : action.payload
      );
      return updatedState;


    },

    // voteAnecdote(state,action) {
    //   const id = action.payload;
    //   const noteToVote = state.find((a) => a.id === id);


    // },

    appendNote(state, action){
      state.push(action.payload);

    },
    setNotes(state, action) {
      return action.payload

    }
  }
});

export const {  toggleImportanceOf, filterByText,  appendNote, setNotes, voteAnecdote } = noteSlice.actions;
//redux thunk 
export const initAnecdotes =() => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setNotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const createAnec = await anecdotesService.createAnecdote(content);
    dispatch(appendNote(createAnec));

  }
}

export const voteAnecdote2 = (id) => {
  return async (dispatch, getState) => {
    const estado = getState().anecdotes;
    const votedAnecdote = await anecdotesService.vote(id,estado);
    dispatch(voteAnecdote(votedAnecdote));
    
  }
}

// end thunk
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
//const generateId = () => Number((Math.random() * 1000000).toFixed(0));

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

// export const voteAnecdote = (id) => {
//   return {
//     type: "VOTE",
//     payload: { id },
//   };
// };

//export default anecdotesReducer;
