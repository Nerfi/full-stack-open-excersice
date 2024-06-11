import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { createStore,combineReducers } from 'redux';
import anecdotesReducer from "./reducers/anecdotesReducer.js";
import filterReducer from "./reducers/filterAnecdotesReducer.js";


//combined reducer

const reducer = combineReducers({
  anecdotes: anecdotesReducer,
  filter: filterReducer
})

const store = createStore(reducer);
//dele this after
store.subscribe(() => console.log(store.getState(), "estado inicial stroe"))
 //store.dispatch(filterReducer("IMPORTANT"));
// store.dispatch(anecdotesReducer('combineReducers forms one reducer from many simple reducers'))



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
