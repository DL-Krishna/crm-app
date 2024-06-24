// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Define the async thunk
// export const fetchLeadStatistics = createAsyncThunk(
//   'leadStatistics/fetchLeadStatistics',
//   async (_, { getState, rejectWithValue }) => {
//     const state = getState();
//     const token = state.auth.token;

//     if (!token) {
//       return rejectWithValue('No token found');
//     }

//     try {
//       const response = await axios.get('http://localhost:3000/api/v1/leads/statistics', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Something went wrong');
//     }
//   }
// );

// const leadStatisticsSlice = createSlice({
//   name: 'leadStatistics',
//   initialState: {
//     data: null,
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchLeadStatistics.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchLeadStatistics.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.data = action.payload;
//         console.log('Lead Statistics:', action.payload); // Log the response to the console
//       })
//       .addCase(fetchLeadStatistics.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//         console.error('Error fetching lead statistics:'); // Log the error to the console
//       });
//   },
// });

// export default leadStatisticsSlice.reducer;
