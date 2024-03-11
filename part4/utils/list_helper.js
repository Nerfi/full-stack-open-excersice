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

  let authorLikes = blogsList.reduce((prev, { author }) => {
    prev[author] = prev[author] || 0;
    prev[author] ++
    return prev;
  }, {});
  const mostLikesInAuthor = Object.keys(authorLikes).sort(
    (a, b) => authorLikes[b] - authorLikes[a]
  )[0];


  return {
    author:mostLikesInAuthor,
    blogs:authorLikes[mostLikesInAuthor]
  }


};



const mostLikes = (blogsList) => {
  let authorLikes = blogsList.reduce((prev, { author, likes }) => {
    prev[author] = prev[author] || 0;
    prev[author] += likes;
    return prev;
  }, {});
  const mostLikesInAuthor = Object.keys(authorLikes).sort(
    (a, b) => authorLikes[b] - authorLikes[a]
  )[0];
  return {
    author:mostLikesInAuthor,
    likes:authorLikes[mostLikesInAuthor]
  }
};




module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}