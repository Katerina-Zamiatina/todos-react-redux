import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const getInitialTodoState = () => {
  const savedTodos = localStorage.getItem('todos');
  return savedTodos ? JSON.parse(savedTodos) : [];
};

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/todos',
});

export const fetchTodos = createAsyncThunk(
  'todos',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('', { params: { _limit: 10 } });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

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
      state.items.push(payload);
    },
    updateTodo(state, { payload }) {
      const { id } = payload;
      state.items.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      );
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
    [fetchTodos.pending]: state => {
      state.isLoading = true;
    },
    [fetchTodos.fulfilled]: (state, { payload }) => {
      state.items = [...state.items, ...payload];
      state.isLoading = false;
    },
    [fetchTodos.rejected]: (state, { payload }) => {
      state.error = payload;
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
