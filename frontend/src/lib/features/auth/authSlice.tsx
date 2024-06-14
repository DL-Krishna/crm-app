import { get, post } from '@/api/base';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface AuthState {
    user: any;
    allUser: any;
    loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    error: string | null;
    isLoader: boolean,
}

const initialState: AuthState = {
    user: null,
    allUser: null,
    loading: 'idle',
    error: null,
    isLoader: false,
};

export const authLogin = createAsyncThunk(
    "/authLogin", async (body: any) => {
        try {
            const response = await post('users/login', body);
            return response;
        } catch (error: any) {
            throw new Error(JSON.stringify(error.response.data));
        }
    }
);
export const getUser = createAsyncThunk(
    "/getUser", async () => {
        try {
            const response = await get('users');
            return response;
        } catch (error: any) {
            throw new Error(JSON.stringify(error.response.data));
        }
    }
);

export const roleWiseGetUser = createAsyncThunk(
    "/roleWiseGetUser", async (role: string) => {
        try {
            const response = await get(`users?role=${role}`);
            return response;
        } catch (error: any) {
            throw new Error(JSON.stringify(error.response.data));
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(authLogin.pending, (state) => {
                state.loading = 'pending';
                state.isLoader = true;
            })
            .addCase(authLogin.fulfilled, (state, action) => {
                state.isLoader = false;
                state.loading = 'fulfilled';
                state.user = action.payload;
                state.error = null;
            })
            .addCase(authLogin.rejected, (state, action) => {
                state.isLoader = false;
                state.loading = 'rejected';
                state.error = action.payload as string;
            })
            .addCase(getUser.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = 'fulfilled';
                state.allUser = action.payload;
                state.error = null;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = 'rejected';
                state.error = action.payload as string;
            })
            .addCase(roleWiseGetUser.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(roleWiseGetUser.fulfilled, (state, action) => {
                state.loading = 'fulfilled';
                state.allUser = action.payload;
                state.error = null;
            })
            .addCase(roleWiseGetUser.rejected, (state, action) => {
                state.loading = 'rejected';
                state.error = action.payload as string;
            });
    }
});


export default authSlice.reducer;
