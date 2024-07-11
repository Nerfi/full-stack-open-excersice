import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AllUsers from "./AllUsers";
import LandingPage from "./LandingPage";
import SingleBLog from "./SingleBLog";
import SingleUser from "./SingleUser";

const Navbar = () => {
  return (
    <nav>
      <Router>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
        </ul>

        {/* RUUTAS */}
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/users" element={<AllUsers />}></Route>
          <Route path="/users/:id" element={<SingleUser />}></Route>
        </Routes>
      </Router>
    </nav>
  );
};

export default Navbar;
