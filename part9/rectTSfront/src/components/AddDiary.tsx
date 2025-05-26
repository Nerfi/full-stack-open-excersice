import { useState } from "react";

import {NewDiary, Visibility , Weather } from "../types/types"
import { createNewDiary } from "../services/diariesServices";

export default function AddDiary() {



    
  const [newDiary, setNewDiary]= useState<NewDiary>({
    date: "",
    visibility: Visibility.Default,
    weather: Weather.Default,
    comment: ""
  }) 

  const handleNewDiary =(e: { target: { name: string; value: string ; }; }): void => {
   const {name, value} = e.target;


    setNewDiary((prev) => ({
      ...prev,
      [name]: value
    }))
  

  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    createNewDiary(newDiary)

  }

  console.log(newDiary, "new diary ")

  return (
    <form onSubmit={handleSubmit} style={{border: "solid red 4px",display: "flex",  justifyContent: "center"}}>
      <div style={{display: "flex", flexDirection: "column",padding: "1rem", border: "solid blue 4px", width:"50vw"}}>
        <h2>Add new entry</h2>

      <label>Date:<input type="date" name="date"/></label>
        <label>Visibility: <input type="text" name="visibility" onChange={handleNewDiary}/></label>
        <label>Weather: <input type="text" name="weather" onChange={handleNewDiary}/></label>
        <label>Comment: <input type="text" name="comment" onChange={handleNewDiary} /></label>
        <input type="submit" />

      </div>
        
    </form>
  )
}
