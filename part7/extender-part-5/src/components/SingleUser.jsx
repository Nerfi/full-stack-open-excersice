import React from "react";
import { Link, useParams } from "react-router-dom";
//
import { useSelector } from "react-redux";

export default function SingleUser() {
  const params = useParams();

  const userRedux = useSelector((state) => state.user.users);
  const user = userRedux.find((user) => user.id === params.id);

  return (
    <div>
      <h2>{user.username}</h2>
      <h3>Blogs added</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
