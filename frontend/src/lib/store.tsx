import { combineReducers, configureStore } from '@reduxjs/toolkit'
import leadSlice from './features/lead/leadSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authSlice from './features/auth/authSlice';
import taskSlice from './features/task/taskSlice';
import navbarSlice from './features/navbar/navbarSlice';
import coursesSlice from './features/courses/coursesSlice';

export const makeStore = () => {
    const rootReducer = combineReducers({
        auth: authSlice,
        lead: leadSlice,
        task: taskSlice,
        nav: navbarSlice,
        courses: coursesSlice,
    });

    return configureStore({
        reducer: rootReducer,
    });
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = () => useAppSelector((state) => state);