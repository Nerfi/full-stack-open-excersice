import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    toggleNotification: (state) => {
      state.show = !state.show;
    },
  },
});

//aqui exportamos los action creators
export const { toggleNotification } = notificationSlice.actions;

//siempre exportamos de forma default el reducer
export default notificationSlice.reducer;
