import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
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
      </Router>
    </div>
  );
};

export default Menu;