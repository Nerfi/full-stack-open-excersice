const filterReducer = (state = "ALL", action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.payload;
    default:
      return state;
  }
};

//action creators
export const filterAnecdotes = (filter) => {
  return {
    type: "SET_FILTER",
    payload: filter,
  };
};


export default filterReducer;

//https://fullstackopen.com/es/part6/muchos_reducers