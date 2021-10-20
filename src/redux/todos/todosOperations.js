import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/todos',
});

export const fetchTodosAsync = createAsyncThunk(
  'todos/getTodosAsync',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('', { params: { _limit: 10 } });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addTodoAsync = createAsyncThunk(
  'todos/addTodoAsync',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('', payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);


// ***** Doesn't work, need to refactor
export const updateTodoAsync = createAsyncThunk(
  'todos/updateTodoAsync',
  async (payload, { rejectWithValue }) => {
    try {
      const {data} = await axiosInstance.patch(`/${payload}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodoAsync',
  async (todoId, { rejectWithValue }) => {
    try {
      return await axiosInstance.delete(`/${todoId}`);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
