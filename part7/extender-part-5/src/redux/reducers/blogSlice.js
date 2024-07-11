import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAll,
  createBlogPost,
  addLikeToPost,
  deleteBlogPost,
  getSingleBlog,
} from "../../services/blogs";

const initialState = {
  blogs: [],
  blog: {},
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
      const updatedBlog = action.payload;

      // Actualiza el blog individual si coincide con el blog actualizado
      if (state.blog && state.blog.id === updatedBlog.id) {
        state.blog = updatedBlog;
      }

      // Actualiza el array de blogs
      state.blogs = state.blogs.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      );
    });

    builder.addCase(deleteSingleBlog.fulfilled, (state, action) => {
      state.blogs = state.blogs.filter((blog) => {
        return blog.id !== action.payload.id;
      });
    });

    builder.addCase(getSingleBlogById.fulfilled, (state, action) => {
      state.blog = action.payload;
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
      console.log("HOLA x2");
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

export const getSingleBlogById = createAsyncThunk(
  "blogs/getSingle",
  async (id) => {
    try {
      const singleBlog = await getSingleBlog(id);
      console.log(singleBlog, "singleblog lqlqlql");

      return singleBlog;
    } catch (error) {
      console.log("error getting single  brlog");
      throw error;
    }
  }
);
