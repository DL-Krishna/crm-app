

import { configureStore } from '@reduxjs/toolkit';
import authReducer, { loadTokenFromLocalStorage } from '../features/auth/authSlice';
// import leadStatisticsReducer from '../features/leads/statistics';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // leadStatistics: leadStatisticsReducer,
  },
});

store.dispatch(loadTokenFromLocalStorage());

export default store;
