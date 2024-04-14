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
  //sorting in descendign
  const anecdotes = useSelector((state) => state.sort((a,b) => b.votes - a.votes));
  const dispatch = useDispatch();
  
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
