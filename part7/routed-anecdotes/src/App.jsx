import { useState } from "react";
import Menu from "./Components/Navbar";
import AnecdoteList from "./Components/AnecdoteList";
import Footer from "./Components/Footer";


const App = () => {


  const [notification, setNotification] = useState("");

 

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {/* <AnecdoteList anecdotes={anecdotes} /> */}
      {/* <About /> */}
      {/* <CreateNew addNew={addNew} /> */}
      <Footer />
    </div>
  );
};

export default App;
