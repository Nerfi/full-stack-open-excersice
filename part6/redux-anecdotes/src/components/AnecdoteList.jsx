import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdotesReducer";

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

  const anecdotes2 = useSelector((state) => {
    console.log(state.filter, "estado en AnecdoteList.jsx");

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
       return state;
        break;
    }

    return [...filterAnecdotes].sort((a, b) => b.votes - a.votes);
  });

  const dispatch = useDispatch();

  return (
    <div>
      <ul>
        {anecdotes2.map(({ id, anecdote, votes }) => (
          <Anecdote
            key={id}
            anecdote={anecdote}
            votes={votes}
            handleClick={() => dispatch(voteAnecdote(id))}
          />
        ))}
      </ul>
    </div>
  );
}
