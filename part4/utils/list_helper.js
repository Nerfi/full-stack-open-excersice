const dummy =(blogs) => {
    return 1;
}

const totalLikes = (blogsList) => {
  if (blogsList.length === 0) {
    return 0;
  }
  const likes = blogsList.reduce((a, b) => {
    return a + b.likes;
  }, 0);
  return likes;
};

const favoriteBlog = (blogsList) => {
 

  const mostLikedBlog = blogsList.reduce((prev, curr) => {
    return prev && prev.likes > curr.likes ? prev : curr;
  });

  return mostLikedBlog;
};

const mostBlogs = (blogsList) => {
  let counter = 0;
  let author;

  for (let i = 0; i < blogsList.length - 1; i++) {
    const currentAuthor = blogsList[i]?.author;
    const nextAuthor = blogsList[i + 1]?.author;

    if (currentAuthor === nextAuthor) {
      counter = counter + 1;
      author = blogsList[i];
    }

  }

  return {
    author: author.author,
    blogs: counter,
  };
};


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}