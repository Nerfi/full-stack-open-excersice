// const filterReducer = (state = "ALL", action) => {
//   switch (action.type) {
//     case "SET_FILTER":
//       return action.payload;
//     default:
//       return state;
//   }
// };

// //action creators
// export const filterAnecdotes = (filter) => {
//   return {
//     type: "SET_FILTER",
//     payload: filter,
//   };
// };


// export default filterReducer;

//https://fullstackopen.com/es/part6/muchos_reducers

//new way of doing redux
import { createSlice, current } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "ALL",
  reducers: {
    filterAnecdotes(state, action) {
      //data comming
      const filter = action.payload;
      return filter;
    },

  }

});
export const {filterAnecdotes} = filterSlice.actions;

export default filterSlice.reducer;
