import React from "react";
import { useLoaderData } from "react-router-dom";

export default function SingleUser() {
  const user = useLoaderData();

  return (
    <div>
      <h2>{user.payload.username}</h2>
      <h3>Blogs added</h3>
      <ul>
        {user.payload.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
}
