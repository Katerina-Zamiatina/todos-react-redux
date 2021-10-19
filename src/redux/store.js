import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './todos/todosReducer';

export const store = configureStore({
  reducer: {
    todos: reducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});
