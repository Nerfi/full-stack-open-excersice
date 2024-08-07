import axios from "axios";
const baseUrl = "/api/blogs";
const loginBaseURL = "/api/users/login";
const signupUserURL = "/api/users";

let token = null;
let error = null;

//TODO LATER: ADD A CREATE USER ENDPOINT

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const login = async (credentials) => {
  try {
    const response = await axios.post(loginBaseURL, credentials);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const createCommentToblog = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  };

  try {
    const commentReq = await axios.post(
      `${baseUrl}/${id}/comments`,
      comment,
      config
    );
    return commentReq.data;
  } catch (error) {
    console.log(error, "error in create comment");
    throw error;
  }
};

const getBlogWithComments = async (id) => {
  try {
    const blogWithComments = await axios.get(`${baseUrl}/${id}/comments`);
    return blogWithComments.data.comments;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createBlogPost = async (blogPost) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const blogRes = await axios.post(baseUrl, blogPost, config);

    return blogRes.data;
  } catch (error) {
    console.log(error);
  }
};

const addLikeToPost = async (blogId, blogDataUpdate) => {
  //console.log(blogDataUpdate, "DATA PASS");

  const config = {
    headers: { Authorization: token },
  };

  try {
    const updatedRes = await axios.put(
      `${baseUrl}/${blogId}`,
      blogDataUpdate,
      config
    );

    return updatedRes.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteBlogPost = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const removeBlog = await axios.delete(`${baseUrl}/${blogId}`, config);
    return removeBlog.data;
  } catch (error) {
    console.log(error);
  }
};

const getSingleBlog = async (blogId) => {
  try {
    const getBlog = await axios.get(`${baseUrl}/${blogId}`);
    return getBlog.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export {
  getAll,
  login,
  setToken,
  createBlogPost,
  addLikeToPost,
  deleteBlogPost,
  getSingleBlog,
  createCommentToblog,
  getBlogWithComments,
};
