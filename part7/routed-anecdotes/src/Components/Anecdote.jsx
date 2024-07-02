import React from "react";
import { useParams } from "react-router-dom";

export default function Anecdote({ anecdotes }) {
  const idParams = useParams().id;
  let anecdote = anecdotes.find((anId) => anId.id === Number(idParams));

  return (
    <div>
      Anecdote
      <h2>{anecdote.content } by {anecdote.author}</h2>
      <span> has {anecdote.votes} votes</span>

      <p>for more info see: {anecdote.info}</p>
    </div>
  );
}
