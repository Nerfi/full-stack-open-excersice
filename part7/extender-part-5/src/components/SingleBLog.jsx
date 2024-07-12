import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addLikeToBlog } from "../redux/reducers/blogSlice";
import { addLikeToPost } from "../services/blogs";
import { setToken } from "../services/blogs";
import { useParams } from "react-router-dom";
import { createComment } from "../redux/reducers/blogSlice";
export default function SingleBLog() {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const { id } = useParams();
  const blogs = useSelector((state) => state.blogs.blogs);

  const selectedBlog = blogs.find((blog) => blog.id === id);
  //  const [likes, setLikes] = useState(blog.payload.likes);

  const userRedux = useSelector((state) => state.user.user);

  useEffect(() => {
    if (userRedux?.token) {
      setToken(userRedux.token);
    }
  }, [userRedux]);

  const handleAddLike = async (e) => {
    const updatedLikes = likes + 1;
    //setLikes(updatedLikes);
    //setLikes(updatedLikes);
    // const dataToUpdate = {
    //   ...blog.payload,
    //   user: blog.payload.user.id,
    //   likes: updatedLikes,
    // };

    //handleUpdateblog(dataToUpdate);
    dispatch(addLikeToBlog(dataToUpdate));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    const dataToSend = {
      id: selectedBlog.id,
      text: comment,
    };

    console.log(e.target.value, "valor");
    setComment(e.target.value);

    dispatch(createComment(dataToSend));
  };
  return (
    <div>
      SingleBLog
      <div>
        <h2>{selectedBlog.title}</h2>
        <span>{selectedBlog.url}</span>
      </div>
      <div>
        <span>likes: {selectedBlog.likes}</span>
        <button onClick={handleAddLike}>Like</button>
      </div>
      <span>added by {selectedBlog.user.username}</span>
      <div>Leave a comment</div>
      <form>
        <label>Comment !</label>
        <input
          type="text"
          placeholder="leave a comment"
          valeu={comment}
          onChange={handleAddComment}
        />
      </form>
    </div>
  );
}
