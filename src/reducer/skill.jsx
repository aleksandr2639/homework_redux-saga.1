import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
  search: "",
};

export const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    searchSkillsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    searchSkillsSuccess: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    searchSkillsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    changeSearchField: (state, action) => {
      state.search = action.payload.search ?? "";
    },
    clearListSkills: (state) => {
      (state.items = []), (state.loading = false);
      state.error = null;
    },
  },
});

export const {
  searchSkillsRequest,
  searchSkillsSuccess,
  searchSkillsFailure,
  changeSearchField,
  clearListSkills,
} = skillsSlice.actions;

export default skillsSlice.reducer;
