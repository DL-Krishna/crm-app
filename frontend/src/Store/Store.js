import { configureStore } from '@reduxjs/toolkit';
import authReducer, { loadTokenFromLocalStorage } from '../Slice/AuthSlice';
import leadStatisticsReducer from '../Slice/stastics';
const store = configureStore({
  reducer: {
    auth: authReducer,
    leadStatistics: leadStatisticsReducer,
  },
});
store.dispatch(loadTokenFromLocalStorage());
export default store;






