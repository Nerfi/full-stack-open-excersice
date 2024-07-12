import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AllUsers from "./AllUsers";
import LandingPage from "./LandingPage";
import SingleBLog from "./SingleBLog";
import SingleUser from "./SingleUser";
import AllBlogs from "./AllBlogs";
import { useSelector, useDispatch } from "react-redux";
import { saveUserInfo } from "../redux/reducers/userSlice";

const Navbar = () => {
  const userRedux = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navStyle = {
    display: "flex",
    gap: 10,
    listStyle: "none",
    justifyContent: "center",
    paddingTop: 10,
  };

  return (
    <nav>
      <Router>
        <ul style={navStyle}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>

          <li>
            <Link to="/blogs">Blogs</Link>
          </li>

          {userRedux != null && (
            <>
              <span>{userRedux.name} logged in</span>
              <button
                onClick={() => {
                  window.localStorage.clear();

                  dispatch(saveUserInfo(null));
                }}
              >
                log out
              </button>
            </>
          )}
        </ul>

        {/* RUUTAS */}
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/users" element={<AllUsers />}></Route>
          <Route path="/blog/:id" element={<SingleBLog />} />
          <Route path="/blogs" element={<AllBlogs />} />
        </Routes>
      </Router>
    </nav>
  );
};

export default Navbar;
