import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdotesReducer";

const Anecdote = ({anecdote, handleClick, votes}) => {
  return (
    <li>
      {anecdote}
      <button onClick={handleClick}>Vote {votes}</button>
    </li>
  );
};

export default function AnecdoteList() {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(anecdotes, "anecdotes slice of state");
  return (
    <div>
      <ul>
        {anecdotes?.map(({ id, anecdote, votes }) => (
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
