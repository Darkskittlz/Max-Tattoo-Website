// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice.js'; // change to your actual slice

export const store = configureStore({
  reducer: {
    someFeature: counterReducer,
  },
});

