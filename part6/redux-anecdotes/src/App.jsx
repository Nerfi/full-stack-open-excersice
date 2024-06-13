import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import FilterAnecdote from "./components/FilterAnecdote";
import { useEffect } from "react";
import anecdotesService from "../services/anecdotes";
import { setNotes } from "./reducers/anecdotesReducer";
import { useDispatch } from "react-redux";
import { initAnecdotes } from "./reducers/anecdotesReducer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    //this is how we used to do it before redux thunk
    //anecdotesService.getAll().then((anecdote) => dispatch(setNotes(anecdote)));
    //with thunk 
    dispatch(initAnecdotes());

  }, []);

  return (
    <>
      <h2>Anecdotes</h2>
      <FilterAnecdote />
      <AnecdoteList />
      <AnecdoteForm />
    </>
  );
}

export default App;
