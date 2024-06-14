import { get, postFormData } from '@/api/base';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface CoursesState {
    CoursesData: any;
    loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    error: string | null;
    isLoader: boolean,
}

const initialState: CoursesState = {
    CoursesData: null,
    loading: 'idle',
    error: null,
    isLoader: false,
};


export const getCourses = createAsyncThunk(
    "/getCourses", async () => {
        try {
            const response = await get('courses');
            return response;
        } catch (error: any) {
            throw new Error(JSON.stringify(error.response.data));
        }
    }
);

export const addCoursesData = createAsyncThunk(
    "/addCoursesData", async (body: any) => {
        try {
            const response = await postFormData('courses', body);
            return response;
        } catch (error: any) {
            throw new Error(JSON.stringify(error.response.data));
        }
    }
);


const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCourses.pending, (state) => {
                state.isLoader = true;
                state.loading = 'pending';
            })
            .addCase(getCourses.fulfilled, (state, action) => {
                state.isLoader = false;
                state.loading = 'fulfilled';
                state.CoursesData = action.payload;
                state.error = null;
            })
            .addCase(getCourses.rejected, (state, action) => {
                state.isLoader = false;
                state.loading = 'rejected';
                state.error = action.payload as string;
            })
            .addCase(addCoursesData.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(addCoursesData.fulfilled, (state, action) => {
                state.loading = 'fulfilled';
                state.CoursesData = action.payload;
                state.error = null;
            })
            .addCase(addCoursesData.rejected, (state, action) => {
                state.loading = 'rejected';
                state.error = action.payload as string;
            })

    }
});


export default coursesSlice.reducer;
