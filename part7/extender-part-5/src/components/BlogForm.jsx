import React, { useState } from "react";

export default function BlogForm({ handleCreate }) {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");

  const handleCreateBlogPost = (e) => {
    e.preventDefault();
    const data = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    };

    handleCreate(data);

    //clean up old state
    setBlogAuthor("");
    setBlogTitle("");
    setBlogUrl("");
  };
  return (
    <>
      <h3>Create a new note/blog</h3>
      <form onSubmit={handleCreateBlogPost}>
        title:
        <input
          type="text"
          name="title"
          placeholder="title"
          id="title"
          value={blogTitle}
          onChange={({ target }) => setBlogTitle(target.value)}
          required
        />
        author:
        <input
          type="text"
          name="author"
          id="author"
          placeholder="author"
          value={blogAuthor}
          onChange={({ target }) => setBlogAuthor(target.value)}
          required
        />
        url:
        <input
          type="url"
          name="url"
          id="url"
          placeholder="https://example.com"
          pattern="https://.*"
          size="30"
          value={blogUrl}
          onChange={({ target }) => setBlogUrl(target.value)}
          required
        />
        <button type="submit" id="create">Create</button>
      </form>
    </>
  );
}
