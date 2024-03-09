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
  let blogCounts = {};

  for (let i = 0; i < blogsList.length; i++) {
    const currentAuthor = blogsList[i]?.author;

    if (currentAuthor) {
      if (blogCounts[currentAuthor]) {
        blogCounts[currentAuthor]++;
      } else {
        blogCounts[currentAuthor] = 1;
      }
    }
  }

  // Find the author with the most blogs
  let maxAuthor = "";
  let maxBlogs = 0;

  for (const author in blogCounts) {
    if (blogCounts[author] > maxBlogs) {
      maxAuthor = author;
      maxBlogs = blogCounts[author];
    }
  }

  return {
    author: maxAuthor,
    blogs: maxBlogs,
  };
};


const mostLikes = (blogList) => {
  let likesByAuthor = {};

  blogList.forEach((blog) => {
    const author = blog.author;
    const likes = blog.likes;

    if (!likesByAuthor[author]) {
      likesByAuthor[author] = likes;
    } else {
      likesByAuthor[author] += likes;
    }
  });

  let maxAuthor = "";
  let maxLikes = 0;

  for (const author in likesByAuthor) {
    if (likesByAuthor[author] > maxLikes) {
      maxAuthor = author;
      maxLikes = likesByAuthor[author];
    }
  }

  return {
    author: maxAuthor,
    likes: maxLikes,
  };
};




module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}