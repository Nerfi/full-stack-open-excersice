import React, { useEffect } from "react";
import { fetchAllUsers } from "../redux/reducers/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function AllUsers() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  console.log(users, "USERS ");

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);
  return (
    <div>
      <div style={{ display: "flex", gap: 20 }}>
        <span>Users</span>
        <span>Blogs created</span>
      </div>

      {users.map((user) => {
        return (
          <div key={user.id}>
            <span>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
              <span style={{ paddingLeft: 30 }}>{user.blogs.length}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}
