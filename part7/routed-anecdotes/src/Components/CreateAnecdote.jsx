import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = ({ anecdoteSetter }) => {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [info, setInfo] = useState("");
  const navigate = useNavigate();
  //custom hook
  const contentField = useField("text");
  const authorField = useField("text");
  const infoField = useField("text");

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    //setAnecdotes(anecdotes.concat(anecdote));
    anecdoteSetter((prevanec) => prevanec.concat(anecdote));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content,
      author,
      info,
      votes: 0,
    });
    //si todo sale bien navegamos a /
    navigate("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          {/* <input {...contentField} /> */}
          <input
            // name="content"
            type={contentField.type}
            value={contentField.value}
            onChange={contentField.onChange}
            //   onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          author
          <input {...authorField} />
          {/* <input
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            /> */}
        </div>
        <div>
          url for more info
          <input {...infoField} />
          {/* <input
              name="info"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
            /> */}
        </div>
        <button>create</button>
      </form>
    </div>
  );
};
export default CreateNew;
