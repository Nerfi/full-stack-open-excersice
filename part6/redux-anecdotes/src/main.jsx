import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
//import { createStore,combineReducers } from 'redux';

// import anecdotesReducer from "./reducers/anecdotesReducer.js";
// import filterReducer from "./reducers/filterAnecdotesReducer.js";

// importing the new way of creating a store with toolkit
import store from "./store/store.js";


//combined reducer

//this down here belongs to the old redux

// const reducer = combineReducers({
//   anecdotes: anecdotesReducer,
//   filter: filterReducer
// })

// const store = createStore(reducer);



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
