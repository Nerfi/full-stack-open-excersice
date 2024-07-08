import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAll, createBlogPost } from "../../services/blogs";

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
    console.error("Error fetching blogs:", error);
    throw error;
  }
});
