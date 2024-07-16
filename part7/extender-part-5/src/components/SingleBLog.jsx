import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addLikeToBlog,
  getSingleBlogComments,
} from "../redux/reducers/blogSlice";
import { setToken } from "../services/blogs";
import { useParams } from "react-router-dom";
import { createComment } from "../redux/reducers/blogSlice";
import Comments from "./Comments";

export default function SingleBLog() {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const { id } = useParams();
  const blogs = useSelector((state) => state.blogs.blogs);

  const selectedBlog = blogs.find((blog) => blog.id === id);

  const comments = useSelector((state) => state.blogs.comments);

  const userRedux = useSelector((state) => state.user.user);

  useEffect(() => {
    if (userRedux?.token) {
      setToken(userRedux.token);
    }
  }, [userRedux]);

  //get the comments
  useEffect(() => {
    dispatch(getSingleBlogComments(selectedBlog.id));
  }, []);

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

    setComment(e.target.value);
  };

  const submmitComment = (e) => {
    e.preventDefault();
    const dataToSend = {
      id: selectedBlog.id,
      text: comment,
    };

    dispatch(createComment(dataToSend));
    //
    setComment(""); // Limpiar el campo de comentario después de agregar
    dispatch(getSingleBlogComments(selectedBlog.id));
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
      <form onSubmit={submmitComment}>
        <label>Comment !</label>
        <input
          type="text"
          placeholder="leave a comment"
          valeu={comment}
          onChange={handleAddComment}
        />
        <button type="submit">Create</button>
      </form>
      <Comments comments={comments} />
    </div>
  );
}
