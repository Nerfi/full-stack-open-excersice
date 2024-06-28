import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Router>
        {/* <Link to="/" style={padding}>anecdotes</Link> */}
        <Link style={padding} to="/">
          anecdotes
        </Link>

        <a href="#" style={padding}>
          create new
        </a>
        <a href="#" style={padding}>
          about
        </a>
      </Router>
    </div>
  );
};

export default Menu;
