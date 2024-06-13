import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote2 } from "../reducers/anecdotesReducer";

const Anecdote = ({ anecdote, handleClick, votes }) => {

  return (
    <li>
      {anecdote}
      <button onClick={handleClick}>Vote {votes}</button>
    </li>
  );
};

export default function AnecdoteList() {
  //sorting in descendign

  //const anecList = useSelector(state => state.anecdotes);

  const anecdotes2 = useSelector((state) => {
    console.log(state.anecdotes, "estado en AnecdoteList.jsx");

    //filtering part
    let filterAnecdotes;
    switch (state.filter) {
      case "ALL":
        filterAnecdotes = state.anecdotes;
        break;

      case "IMPORTANT":
         (filterAnecdotes = state.anecdotes.filter(
          (anec) => anec.important
        ));
        break;
      case "NONIMPORTANT":
         (filterAnecdotes = state.anecdotes.filter(
          (anec) => !anec.important
        ));
        break;
      default:
       return state.anecdotes;
       
    }

    return [...filterAnecdotes].sort((a, b) => b.votes - a.votes);
  });

  const dispatch = useDispatch();
  

  return (
    <div>
      <ul>
         {anecdotes2.map(({ id, content, votes }) => (
          <Anecdote
            key={id}
            anecdote={content}
            votes={votes}
            handleClick={() => dispatch(voteAnecdote2(id))}
          />
        ))}
        
      </ul>
    </div>
  );
}
