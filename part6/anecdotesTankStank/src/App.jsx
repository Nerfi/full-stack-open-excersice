import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAnecdotes,
  createAnecdote,
  updateAnecdote,
  voteAnecdote,
} from "./services/requests";
//reducer + context
import { useContext } from "react";
import NotificationContext from "./context/NotifContext";

const App = () => {
  //reducer + context
  const [notif, dispatch] = useContext(NotificationContext);

  //con esta logica/codigo lo que vamos a hacer es anular la antigua query , cuando mutemos
  //para asi poder actualizar el front con lo nuevo agregado en el back
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      /*
      Esto hace que React Query actualice automáticamente la query con la clave notes, 
      es decir que obtiene nuevamente las notas del servidor. Como resultado, la aplicación renderiza el estado actualizado en el servidor, 
      por lo que la nota agregada también se renderiza. */
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      //añadimos la nueva entrada a nuestra bbdd
      const notes = queryClient.getQueryData(["notes"]);
      queryClient.setQueryData(["notes"], notes.concat(newAnecdote));
    },
    onError: (error) => {
      console.log("ERROR  " + error);
      //throw error;
      dispatch({ type: "error" , payload: error});
      return <Notification notification={error}/>
    },
  });

  //console.log(newAnecdoteMutation, "new anecdote mutation");

  //otra mutacion para hacer update
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      //queryClient.invalidateQueries({queryKey: ['notes']})
      queryClient.invalidateQueries("notes");
    },
  });
  const toggleImportance = (anecdote) => {
    updateAnecdoteMutation.mutate({
      ...anecdote,
      importante: !anecdote.important,
    });
  };

  const result = useQuery({
    queryKey: ["notes"],
    queryFn: getAnecdotes, //al pasar la funcion como ref es lo mismo que si la escribiesemos
    //ya que gracias a eso en result cont tendremos el resultado de llamar a esa funcion
  });
  //console.log(JSON.parse(JSON.stringify(result)))

  //usamos mutations para poder hacer diferentes acciones en el servidor
  //https://tanstack.com/query/latest/docs/framework/react/guides/mutations
  const addAnecdote = async (content) => {
    newAnecdoteMutation.mutate({ content, important: true, votes: 0 });
  };

  const anecdotes = result.data;

  //adding voting functionality

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries("notes");
    },
  });

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    //dispatching reducer + context
    dispatch({ type: "vote", payload: anecdote.content });
  };

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

 

  //console.log(result, "resultado");

  return (
    <div>
      <h3>Anecdote app tank stank </h3>
      {notif && notif.estado ? (
        <Notification notification={notif.notif} />
      ) : null}

      <AnecdoteForm anecdoteAdd={addAnecdote} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote?.id}>
          <div>{anecdote?.content}</div>
          <div>
            has {anecdote?.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
