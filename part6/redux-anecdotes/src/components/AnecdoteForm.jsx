import React from "react";
import { useDispatch } from "react-redux";
//import { addAnecdote } from "../reducers/anecdotesReducer";
//new way of doing it
import {createAnecdote} from "../reducers/anecdotesReducer";

/* por la simplicidad que tiene este formulario lo que hems 
hecho ha sido crearlo como un uncontrolled componente 
https://goshacmd.com/controlled-vs-uncontrolled-inputs-react/ ----> for more info read that again
*/
export default function AnecdoteForm() {
  const dispatch = useDispatch();
  
  const addNote = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    //limpiando
    e.target.anecdote.value = "";
    //add to store
    dispatch(createAnecdote(content));
  };
  return (
    <div>
      <form onSubmit={addNote}>
        <input name="anecdote" />
        <button type="submit">add</button>
      </form>
    </div>
  );
}
