import { useContext } from "react";
import NotificationContext from "../context/NotifContext";

const AnecdoteForm = ({anecdoteAdd}) => {
  const [notif, dispatch] = useContext(NotificationContext);

  console.log(notif, "NOTIF IN FORM")

 // console.log(notif, "notif state from reducer and context"); works as expected

    const onCreate = (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      //console.log('new anecdote:', content);
      //llamar a la funcion
      anecdoteAdd(content);
      //dispatching context + reducer 
      dispatch({type: "add"});
  }
  
    return (
      <div>
        <h3>create new</h3>
        <form onSubmit={onCreate}>
          <input name='anecdote' />
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
  
  export default AnecdoteForm