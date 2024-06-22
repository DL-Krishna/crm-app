// // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // import axios from 'axios';

// // export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
// //   try {
// //     const response = await axios.post('http://localhost:3000/api/v1/users/login', credentials);
// //     return response.data;
// //   } catch (error) {
// //     return rejectWithValue(error.response.data);
// //   }
// // });

// // const authSlice = createSlice({
// //   name: 'auth',
// //   initialState: {
// //     userInfo: null,
// //     token: null,
// //     status: 'idle',
// //     error: null,
// //   },
// //   reducers: {
// //     logout: (state) => {
// //       state.userInfo = null;
// //       state.token = null;
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(login.pending, (state) => {
// //         state.status = 'loading';
// //       })
// //       .addCase(login.fulfilled, (state, action) => {
// //         state.status = 'succeeded';
// //         state.userInfo = action.payload.userInfo;
// //         state.token = action.payload.token;
// //       })
// //       .addCase(login.rejected, (state, action) => {
// //         state.status = 'failed';
// //         state.error = action.payload;
// //       });
// //   },
// // });

// // export const { logout } = authSlice.actions;

// // export default authSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
//   try {
//     const response = await axios.post('http://localhost:3000/api/v1/users/login', credentials);
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response.data);
//   }
// });

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     userInfo: null,
//     token: null,
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     logout: (state) => {
//       state.userInfo = null;
//       state.token = null;
//       state.status = 'idle';
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.userInfo = action.payload.userInfo;
//         state.token = action.payload.token;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;

// export default authSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
//   try {
//     const response = await axios.post('http://localhost:3000/api/v1/users/login', credentials);
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response.data);
//   }
// });

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     userInfo: null,
//     token: null,
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     logout: (state) => {
//       state.userInfo = null;
//       state.token = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.userInfo = action.payload.userInfo;
//         state.token = action.payload.token;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;

// export default authSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Function to load initial state from localStorage
// const initialState = {
//   userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
//   token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
//   status: 'idle',
//   error: null,
// };

// export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
//   try {
//     const response = await axios.post('http://localhost:3000/api/v1/users/login', credentials);
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response.data);
//   }
// });

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       localStorage.removeItem('userInfo'); // Clear from localStorage on logout
//       localStorage.removeItem('token');
//       localStorage.clear()
//       state.userInfo = null;
//       state.token = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.userInfo = action.payload.userInfo;
//         state.token = action.payload.token;
//         // Save to localStorage on successful login
//         localStorage.setItem('userInfo', JSON.stringify(action.payload.userInfo));
//         localStorage.setItem('token', action.payload.token);
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;

// export default authSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Function to load initial state from localStorage
// const initialState = {
//   userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
//   token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
//   status: 'idle',
//   error: null,
// };

// export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
//   try {
//     const response = await axios.post('http://localhost:3000/api/v1/users/login', credentials);
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response.data);
//   }
// });

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       localStorage.removeItem('userInfo'); // Clear from localStorage on logout
//       localStorage.removeItem('token');
//       state.userInfo = null;
//       state.token = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.userInfo = action.payload.userInfo;
//         state.token = action.payload.token;
//         // Save to localStorage on successful login
//         localStorage.setItem('userInfo', JSON.stringify(action.payload.userInfo));
//         localStorage.setItem('token', action.payload.token);
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;

// export default authSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
  status: 'idle',
  error: null,
};

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:3000/api/v1/users/login', credentials);
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
