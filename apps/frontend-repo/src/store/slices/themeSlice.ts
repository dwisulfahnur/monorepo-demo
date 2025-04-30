import { createSlice } from '@reduxjs/toolkit';

type ThemeState = {
  mode: 'light' | 'dark';
};

const initialState: ThemeState = {
  mode: 'light', // default
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action) => {
      state.mode = action.payload; // payload should be 'light' or 'dark'
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
