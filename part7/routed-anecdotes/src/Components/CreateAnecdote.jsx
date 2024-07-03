import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = ({ anecdoteSetter }) => {
  //const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [info, setInfo] = useState("");
  const navigate = useNavigate();
  //custom hook
  const contentField = useField("text");
  const authorField = useField("text");
  const infoField = useField("text");
  //test
  const {        resetValues
  } = useField("text");

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

  //reset functio
  const handleReset = () => {
    contentField.resetValues();
    authorField.resetValues();
    infoField.resetValues();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
           {/* <input {...contentField} />  */}
           <input
            // name="content"
            type={contentField.type}
            value={contentField.value}
            onChange={contentField.onChange}
          /> 
        </div>
        <div>
          author
          {/* <input {...authorField} /> */}
          <input
              name="author"
              type={authorField.type}
              value={authorField.value}
              onChange={authorField.onChange}
            />
        </div>
        <div>
          url for more info
          {/* <input {...infoField} /> */}
          <input
              name="info"
              type={infoField.type}
              value={infoField.value}
              onChange={infoField.onChange}
            />
        </div>
        <button>create</button>
        <button type="reset" onClick={handleReset}>reset</button>
      </form>
    </div>
  );
};
export default CreateNew;
