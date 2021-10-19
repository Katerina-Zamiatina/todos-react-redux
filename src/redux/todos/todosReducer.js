import { combineReducers, createSlice, createReducer } from '@reduxjs/toolkit';
import { fetchTodos, addTodo, deleteTodo } from './todosOperations';

const initialState = {
  todos: [],
  isLoading: false,
  error: null,
};

export const { actions, reducer } = createSlice({
  name: 'todos',
  initialState,
  extraReducers: {
    [fetchTodos.pending](state) {
      state.isLoading = true;
    },
    [fetchTodos.fulfilled](state, { payload }) {
      state.todos = payload;
      state.isLoading = false;
    },
    [fetchTodos.rejected](state, { payload }) {
      state.error = payload;
    },
    [addTodo.pending](state) {
      state.isLoading = true;
    },
    [addTodo.fulfilled](state, { payload }) {
      state.todos = [...state, payload];
      state.isLoading = true;
    },
    [addTodo.rejected](state, { payload }) {
      state.error = payload;
    },
    [deleteTodo.pending](state) {
      state.isLoading = true;
    },
    [deleteTodo.fulfilled](state, { payload }) {
      state.todos.filter(({ id }) => id !== payload);
      state.isLoading = true;
    },
    [deleteTodo.rejected](state, { payload }) {
      state.error = payload;
    },
  },
});

// const filterReducer = createReducer('', {
//   [filterTodo]: (_, { payload }) => payload,
// });


