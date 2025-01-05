import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trending: [],
  searchResults: [],
};

const gifsSlice = createSlice({
  name: "gifs",
  initialState,
  reducers: {
    setTrendingGifs: (state, action) => {
      state.trending = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

export const { setTrendingGifs, setSearchResults } = gifsSlice.actions;
export default gifsSlice.reducer;
