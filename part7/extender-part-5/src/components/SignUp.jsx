import React from "react";

export default function SignUp() {
  return (
    <div>
      SignUp
      <form onSubmit={"logginUser"}>
        <div>
          Username
          <input
            type="text"
            name="username"
            id="username"
            value={"username"}
            //onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="password"
            id="password"
            value={"password"}
            // onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login-btn">
          Signup
        </button>
      </form>
    </div>
  );
}
