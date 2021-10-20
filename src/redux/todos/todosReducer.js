import { createSlice } from '@reduxjs/toolkit';
import {
  addTodoAsync,
  fetchTodosAsync,
  deleteTodoAsync,
  updateTodoAsync,
} from '../todos/todosOperations';

const getInitialTodoState = () => {
  const savedTodos = localStorage.getItem('todos');
  return savedTodos ? JSON.parse(savedTodos) : [];
};

const initialState = {
  items: getInitialTodoState(),
  isLoading: false,
  error: null,
};

const { actions, reducer } = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, { payload }) {
      state.items = [...state.items, payload];
    },
    updateTodo(state, { payload }) {
      const todo = state.items.find(item => item.id === payload.id);
      if (todo) {
        todo.completed = !todo.completed;
      }
      // state.items.map(item =>
      //   item.id === payload.id ? { ...item, completed: !item.completed } : item,
      // );
    },
    deleteTodo(state, { payload }) {
      const { id } = payload;
      const existingTodo = state.items.find(item => item.id === id);
      if (existingTodo) {
        state.items = state.items.filter(item => item.id !== id);
      }
    },
  },
  extraReducers: {
    [fetchTodosAsync.fulfilled]: (state, { payload }) => {
      state.items = [...state.items, ...payload];
      state.isLoading = false;
    },
    [addTodoAsync.fulfilled]: (state, { payload }) => {
      state.items = [...state.items, payload];
      state.isLoading = false;
    },
    [updateTodoAsync.fulfilled]: (state, { payload }) => {
      const todo = state.items.find(item => item.id === payload.id);
      if (todo) {
        todo.completed = !todo.completed;
      }
      // state.items.map(item =>
      //   item.id === payload.id ? { ...item, completed: !item.completed } : item,
      // );
      state.isLoading = false;
    },
    [deleteTodoAsync.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      return state.items.filter(item => item.id !== payload.id);
    },
  },
});

export { actions, reducer };

// const { actions, reducer } = createSlice({
//   name: 'todos',
//   initialState,
//   extraReducers: {
//     [fetchTodos.pending](state) {
//       state.isLoading = true;
//     },
//     [fetchTodos.fulfilled](state, { payload }) {
//       state.todos = payload;
//       state.isLoading = false;
//     },
//     [fetchTodos.rejected](state, { payload }) {
//       state.error = payload;
//     },
//     // [addTodo.pending](state) {
//     //   state.isLoading = true;
//     // },
//     // [addTodo.fulfilled](state, { payload }) {
//     //   state.todos = [...state, payload];
//     //   state.isLoading = true;
//     // },
//     // [addTodo.rejected](state, { payload }) {
//     //   state.error = payload;
//     // },
//     // [deleteTodo.pending](state) {
//     //   state.isLoading = true;
//     // },
//     // [deleteTodo.fulfilled](state, { payload }) {
//     //   state.todos.filter(({ id }) => id !== payload);
//     //   state.isLoading = true;
//     // },
//     // [deleteTodo.rejected](state, { payload }) {
//     //   state.error = payload;
//     // },
//   },
// });
