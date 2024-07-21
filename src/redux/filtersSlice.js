import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: '',
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterContacts: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { filterContacts } = filterSlice.actions;
export default filterSlice.reducer;
