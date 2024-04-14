import React from "react";
import { useDispatch } from "react-redux";
import { filterAnecdotes } from "../reducers/filterAnecdotesReducer";

export default function FilterAnecdote() {
  const dispatch = useDispatch();
  const handleFilter = (e) => {
    e.preventDefault();
    const filterValue = e.target.filter.value;
    //limpiando pseudo estado
    e.target.filter.value = "";
    dispatch(filterAnecdotes(filterValue));
  };
  return (
    <div>
      <form onSubmit={handleFilter}>
        FilterAnecdote
        <input placeholder="filter" name="filter" />
      </form>
    </div>
  );
}
