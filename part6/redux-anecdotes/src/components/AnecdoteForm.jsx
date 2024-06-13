import React from "react";
import { useDispatch } from "react-redux";
//import { addAnecdote } from "../reducers/anecdotesReducer";

//back-end stuff
import anecdotesService from "../../services/anecdotes";

//redux thunk
import { createAnecdote } from "../reducers/anecdotesReducer";


/* por la simplicidad que tiene este formulario lo que hems 
hecho ha sido crearlo como un uncontrolled componente 
https://goshacmd.com/controlled-vs-uncontrolled-inputs-react/ ----> for more info read that again
*/
export default function AnecdoteForm() {
  const dispatch = useDispatch();
  
  const addNote = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    //limpiando
    e.target.content.value = "";
    //delete it because we use redux thunk
    //const newAnecdote = await anecdotesService.createAnecdote(content);

    //add to store
    dispatch(createAnecdote(content));
  };
  return (
    <div>
      <form onSubmit={addNote}>
        <input name="content" />
        <button type="submit">add</button>
      </form>
    </div>
  );
}
