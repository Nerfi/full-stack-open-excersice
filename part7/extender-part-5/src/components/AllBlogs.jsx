import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AllBlogs() {
  const blogs = useSelector((state) => state.blogs.blogs);
  // podria refactorizar el componente Blog , pero por razones de tiempo no lo haremos, deberes
  return (
    <div>
      AllBlogs
      {blogs.map((blog) => {
        return (
          <ul key={blog.id}>
            <li>
              <Link to={`/blog/${blog.id}`}> {blog.title} </Link>
            </li>
          </ul>
        );
      })}
    </div>
  );
}
