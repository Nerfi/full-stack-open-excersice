import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addLikeToBlog } from "../redux/reducers/blogSlice";
import { addLikeToPost } from "../services/blogs";
import { setToken } from "../services/blogs";

export default function SingleBLog() {
  const dispatch = useDispatch();
  const blog = useLoaderData();

  const [likes, setLikes] = useState(blog.payload.likes);

  const userRedux = useSelector((state) => state.user.user);

  useEffect(() => {
    if (userRedux?.token) {
      setToken(userRedux.token);
    }
  }, [userRedux]);

  const handleAddLike = async (e) => {
    const updatedLikes = likes + 1;
    setLikes(updatedLikes);
    //setLikes(updatedLikes);
    const dataToUpdate = {
      ...blog.payload,
      user: blog.payload.user.id,
      likes: updatedLikes,
    };

    //handleUpdateblog(dataToUpdate);
    dispatch(addLikeToBlog(dataToUpdate));
  };
  return (
    <div>
      SingleBLog
      <div>
        <h2>{blog.payload.title}</h2>
        <span>{blog.payload.url}</span>
      </div>
      <div>
        <span>likes: {blog.payload.likes}</span>
        <button onClick={handleAddLike}>Like</button>
      </div>
    </div>
  );
}
