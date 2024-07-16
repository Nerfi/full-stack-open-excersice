import React from "react";

export default function Comments({ comments }) {
  return (
    <div>
      <ul>
        {comments.map((comment) => {
          return <li key={comment.id}>{comment.text}</li>;
        })}
      </ul>
    </div>
  );
}
