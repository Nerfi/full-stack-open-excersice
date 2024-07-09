import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAll,
  createBlogPost,
  addLikeToPost,
  deleteBlogPost,
} from "../../services/blogs";

const initialState = {
  blogs: [],
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      state.blogs = action.payload;
    });

    builder.addCase(createBlog.fulfilled, (state, action) => {
      state.blogs.push(action.payload);
    });

    builder.addCase(addLikeToBlog.fulfilled, (state, action) => {
      state.blogs = state.blogs.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      );
    });

    builder.addCase(deleteSingleBlog.fulfilled, (state, action) => {
      state.blogs = state.blogs.filter((blog) => {
        return blog.id !== action.payload.id;
      });
    });
  },
});

//siempre exportamos de forma default el reducer
export default blogsSlice.reducer;

//creating the thunk in order to perfomr async actions

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  try {
    const response = await getAll();
    return response;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
});
//create blog asyn thunk

export const createBlog = createAsyncThunk("blogs/createBlog", async (blog) => {
  try {
    const newBlogPost = await createBlogPost(blog);
    return newBlogPost;
  } catch (error) {
    console.error("Error creating blogs:", error);
    throw error;
  }
});

export const addLikeToBlog = createAsyncThunk(
  "blogs/addLikeToBlog",
  async (data) => {
    //PARA SABER PORQUE HEMOS HECHO LO QUE HEMOS HECHO EN ESTA FUNCION , PASARLE SOLO UN PARAMETRO A ASYNC (DATA)
    //https://stackoverflow.com/questions/64742747/how-do-you-pass-arguments-to-createasyncthunk-in-redux-toolkit
    const { id } = data;
    try {
      const addLikeToBlogPost = await addLikeToPost(id, data);
      return addLikeToBlogPost;
      //updating the state, this is one way of doing it, here is the other one done in the exercise of full stack open: https://github.com/Nerfi/full-stack-open-excersice/blob/master/part6/redux-anecdotes/src/reducers/anecdotesReducer.js
    } catch (error) {
      console.error("Error liking blogs:", error);
      throw error;
    }
  }
);

export const deleteSingleBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (blogId) => {
    try {
      const deleteBlog = await deleteBlogPost(blogId);
      return deleteBlog;
    } catch (error) {
      console.log("error deleting brlog");
      throw error;
    }
  }
);
