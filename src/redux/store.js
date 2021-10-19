import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './todos/todosReducer';

export const store = configureStore({
  reducer: {
    reducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});
