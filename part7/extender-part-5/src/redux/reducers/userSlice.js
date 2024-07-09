import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsers, fetchSingleUser } from "../../services/users";

const initialState = {
  user: {},
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUserInfo: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default userSlice.reducer;

export const { saveUserInfo } = userSlice.actions;

//  THUNK IN ORDER TO PERFOM USER ACTIONS

export const fetchAllUsers = createAsyncThunk("users/getAll", async () => {
  try {
    const allUsers = await getAllUsers();
    return allUsers;
  } catch (error) {
    console.log("error in fetching all users");
    throw error;
  }
});

export const fetchUser = createAsyncThunk(
  "users/fetchSingleUser",
  async (userId) => {
    try {
      const singleUser = await fetchSingleUser(userId);

      return singleUser;
    } catch (error) {
      console.log("error fetching single user");
      throw error;
    }
  }
);
