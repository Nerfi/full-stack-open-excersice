import { useState } from "react";

export default function AddDiary() {
    const [newDiary, setNewDiary]= useState() // add tipo con omit de ID ya que no tnedremos en add 
  return (
    <form onSubmit={() => alert("added me mthfc")}>
        <label>Date:<input type="date" /></label>
    </form>
  )
}
