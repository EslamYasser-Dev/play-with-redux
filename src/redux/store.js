// store.js
import { configureStore } from '@reduxjs/toolkit';
import examReducer from './examSlice';

const store = configureStore({
  reducer: {
    exam: examReducer,
 
  },
});

export default store;
