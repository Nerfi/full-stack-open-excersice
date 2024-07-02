import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateNew from "./CreateAnecdote";
import AnecdoteList from "./AnecdoteList";
import About from "./About";
import Anecdote from "./Anecdote";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  //anecdotes
  //this is not the best place to have this but for now will work 

  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);
  return (
    <div>
      <Router>
        <Link style={padding} to="/">
          anecdotes
        </Link>

        <Link style={padding} to="/create">
          create new
        </Link>
        <Link to="/about" style={padding}>
          about
        </Link>
        {/* RUUTAS */}
        <Routes>
          <Route path="/create" element={<CreateNew anecdoteSetter={setAnecdotes}/>} />
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/about" element={<About />} />
          <Route path="/anecdote/:id" element={<Anecdote anecdotes={anecdotes} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Menu;
