import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  adminList: [],
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addAdmin: (state, action) => {
      state.adminList.push(action.payload);
    }
  },
});

export const {  addAdmin } = counterSlice.actions;

export default counterSlice.reducer;
