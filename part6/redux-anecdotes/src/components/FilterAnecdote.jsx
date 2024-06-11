import React from "react";
import { useDispatch } from "react-redux";
import { filterAnecdotes } from "../reducers/filterAnecdotesReducer";

export default function FilterAnecdote() {
  const dispatch = useDispatch();
  
  const handleFilter = (e) => {
    e.preventDefault();

    //console.log(e.target.value, "filter value??")
    const filterValue = e.target.value;
    //limpiando pseudo estado
    //e.target.filter.value = "";
    dispatch(filterAnecdotes(filterValue));
  };
  //style
  const style = {
    marginBottom: 10
  }


  
  return (
    <div style={style}>
      filter <input onChange={handleFilter} />
      <div className="btns">
        all
      <input type="radio" id="huey" name="drone" value="ALL" onChange={(e) =>dispatch(filterAnecdotes("ALL")) } />
      important
      <input type="radio" id="huey" name="drone" value="IMPORTANT" onChange={() => dispatch(filterAnecdotes("IMPORTANT")) } />
      no important
      <input type="radio" id="huey" name="drone" value="NONIMPORTANT" onChange={() => dispatch(filterAnecdotes("NONIMPORTANT")) } />

      </div>
    
    </div>
  );
}
