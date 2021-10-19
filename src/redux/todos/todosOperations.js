import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

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

// export const addTodo = createAsyncThunk(
//   'todos',
//   async (todo, { rejectWithValue }) => {
//     try {
//       return await axiosInstance.post('', todo);
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   },
// );

// export const deleteTodo = createAsyncThunk(
//   'todos',
//   async (todoId, { rejectWithValue }) => {
//     try {
//       return await axiosInstance.delete(`/${todoId}`);
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   },
// );
