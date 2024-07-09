import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUserInfo: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { saveUserInfo } = userSlice.actions;

//  THUNK IN ORDER TO PERFOM USER ACTIONS
