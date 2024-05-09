import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./CounterSlice";

const adminListSlice = createSlice({
  name: "adminList",
  initialState: [],
  reducers: {
    addAdmin: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addAdmin } = adminListSlice.actions;

const adminListReducer = adminListSlice.reducer;

export default configureStore({
  reducer: {
    counter: counterReducer,
    adminList: adminListReducer,
  },
});
