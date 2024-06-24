
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../api/BaseUrl';

const initialState = {
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
  status: 'idle',
  error: null,
};

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${baseUrl}/users/login`, credentials);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
      state.userInfo = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
    },
    loadTokenFromLocalStorage: (state) => {
      const token = localStorage.getItem('token');
      if (token) {
        state.token = token;
        state.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload.userInfo;
        state.token = action.payload.token;
        localStorage.setItem('userInfo', JSON.stringify(action.payload.userInfo));
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout, loadTokenFromLocalStorage } = authSlice.actions;

export default authSlice.reducer;
