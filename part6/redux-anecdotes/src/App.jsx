import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import FilterAnecdote from "./components/FilterAnecdote";
import { useEffect } from "react";
import anecdotesService from "../services/anecdotes";
import { setNotes } from "./reducers/anecdotesReducer";
import {  useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    anecdotesService.getAll().then(anecdote => dispatch(setNotes(anecdote)))
  },[]);

  return (
    <>
      <h2>Anecdotes</h2>
      <FilterAnecdote/>
       <AnecdoteList/>
      <AnecdoteForm /> 
    </>
  );
}

export default App;
