import { useState, useEffect } from "react";
import Togglable from "./Toggale";
import axios from "axios";
//redux thunk
import { useDispatch } from "react-redux";
import { addLikeToBlog } from "../redux/reducers/blogSlice";
import { Link } from "react-router-dom";

const Blog = ({ blog, handleDelete, user }) => {
  const [likes, setLikes] = useState(0);
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const baseUrl = "/api/blogs";

  //in order to avoid re-initializing the state we fetch the likes of each blog and update them
  useEffect(() => {
    const fetchLikes = async () => {
      const blogData = await axios(`${baseUrl}/${blog.id}`);
      //console.log(blogData.data.likes, "blog data")
      setLikes(blogData.data.likes);
    };
    //always call the function
    fetchLikes();
  }, []);

  const handleAddLike = async (e) => {
    e.preventDefault();
    e.persist();

    const updatedLikes = likes + 1;
    setLikes(updatedLikes);
    const dataToUpdate = {
      ...blog,
      user: blog.user.id,
      likes: updatedLikes,
    };

    //handleUpdateblog(dataToUpdate);
    dispatch(addLikeToBlog(dataToUpdate));
  };

  const handleRemoveBlogPost = (e) => {
    e.preventDefault();

    handleDelete(blog.id);
  };

  return (
    <div style={blogStyle} className="singleNoteComponent">
      <Link to={`/blog/${blog.id}`}>{blog.title}</Link>

      <Togglable buttonLabel="view">
        <div style={{ border: "solid 2px black" }}>
          <div>
            <ul>
              <li> {blog.author}</li>
              <li className="url"> {blog.url}</li>
              <li className="likes">
                likess: {blog.likes}
                <button onClick={handleAddLike} id="like">
                  Like
                </button>
              </li>
            </ul>
            <div>
              {user?.name.toLowerCase() === blog.author.toLowerCase() ? (
                <button onClick={handleRemoveBlogPost}>Remove</button>
              ) : null}
            </div>
          </div>
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
