import React, { useState } from "react";
import PropTypes from "prop-types";

export default function Login({ handleLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const logginUser = (e) => {
    e.preventDefault();

    handleLogin(username, password);

    //limpiando el estado
    setPassword("");
    setUsername("");
  };
  return (
    <form onSubmit={logginUser}>
      <h2>Login user</h2>
      <div>
        Username
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login-btn">
        Login
      </button>
    </form>
  );
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};
