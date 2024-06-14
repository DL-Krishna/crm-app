import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LeadeData } from '@/app/component/Type';
import { del, get, post, postFormData, put } from '@/api/base';

interface ContactState {
    LeadData: any;
    SingleLead: any;
    loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    error: string | null;
    isLoader: boolean;
    isdelLoader: boolean;
    meeting: any;
    email: any;
    call: any;
    message: any;
}

const initialState: ContactState = {
    LeadData: null,
    SingleLead: null,
    loading: 'idle',
    error: null,
    isLoader: false,
    isdelLoader: false,
    meeting: null,
    email: null,
    call: null,
    message: null,
};

export const getLeadData = createAsyncThunk(
    "getLeadData",
    async (leadStage?: string) => {
        try {
            const response = await get<LeadeData[]>(`leads?leadStage=${leadStage}`);
            return response;
        } catch (error: any) {
            // If an error occurs, return the error response data
            throw new Error(error.response.data);
        }
    }
);
export const getSingleLead = createAsyncThunk(
    "getSingleLead",
    async (id: number) => {
        try {
            const response = await get<LeadeData[]>(`leads/${id}`);
            return response;
        } catch (error: any) {
            // If an error occurs, return the error response data
            throw new Error(error.response.data);
        }
    }
);

export const getLeadFilter = createAsyncThunk(
    "getLeadFilter",
    async ({ leadStage, data }: { leadStage?: string, data?: string }) => {
        try {
            const response = await get<LeadeData[]>(`leads?leadStage=${leadStage}&${data}`);
            return response;
        } catch (error: any) {
            // If an error occurs, return the error response data
            throw new Error(error.response.data);
        }
    }
);

export const addLeadData = createAsyncThunk(
    "/addLeadData", async (body: any) => {
        try {
            const response = await post('leads', body);
            return response;
        } catch (error: any) {
            throw new Error(JSON.stringify(error.response.data));
        }
    }
);

export const updateLeadData = createAsyncThunk(
    "/updateLeadData", async (data: any) => {
        try {
            const response = await put(`leads/${data?.id}`, data?.data);
            return response;
        } catch (error: any) {
            throw new Error(JSON.stringify(error.response.data));
        }
    }
);

export const deleteLeadsData = createAsyncThunk(
    "/deleteLeadsData", async (ids: any) => {
        try {
            const response = await del(`leads?ids=${ids}`);
            return response;
        } catch (error: any) {
            throw new Error(JSON.stringify(error.response.data));
        }
    }
);

export const addRelatedContactData = createAsyncThunk(
    "/addRelatedContactData", async (body: any) => {
        try {
            const response = await post('related-contacts', body);
            return response;
        } catch (error: any) {
            throw new Error(error.response.data);
        }
    }
);

export const addTask = createAsyncThunk(
    "/addTask", async (body: any) => {
        try {
            const response = await post('tasks', body);
            return response;
        } catch (error: any) {
            throw new Error(error.response.data);
        }
    }
);

export const addEmail = createAsyncThunk(
    "/addEmail", async (body: any) => {
        try {
            const response = await post('emails/send', body);
            return response;
        } catch (error: any) {
            throw new Error(JSON.stringify(error.response.data));
        }
    }
);

export const addMeeting = createAsyncThunk(
    "/addMeeting", async (body: any) => {
        try {
            const response = await post('meetings/schedule', body);
            return response;
        } catch (error: any) {
            throw new Error(JSON.stringify(error.response.data));
        }
    }
);

export const addCall = createAsyncThunk(
    "/addCall", async (body: any) => {
        try {
            const response = await postFormData('calls', body);
            return response;
        } catch (error: any) {
            throw new Error(JSON.stringify(error.response.data));
        }
    }
);

export const addMessage = createAsyncThunk(
    "/addMessage", async (body: any) => {
        try {
            const response = await post('messages/send', body);
            return response;
        } catch (error: any) {
            throw new Error(JSON.stringify(error.response.data));
        }
    }
);

export const deleteRelatedContactsData = createAsyncThunk(
    "/deleteRelatedContactsData", async (ids: any) => {
        try {
            const response = await del(`related-contacts?ids=${ids}`);
            return response;
        } catch (error: any) {
            throw new Error(JSON.stringify(error.response.data));
        }
    }
);

export const getMeetingData = createAsyncThunk(
    "getMeetingData",
    async () => {
        try {
            const response = await get(`meetings`);
            return response;
        } catch (error: any) {
            throw new Error(error.response.data);
        }
    }
);

export const getEmail = createAsyncThunk(
    "getEmail",
    async () => {
        try {
            const response = await get(`emails`);
            return response;
        } catch (error: any) {
            throw new Error(error.response.data);
        }
    }
);

export const getLogCall = createAsyncThunk(
    "getLogCall",
    async () => {
        try {
            const response = await get(`calls`);
            return response;
        } catch (error: any) {
            throw new Error(error.response.data);
        }
    }
);

export const getMessage = createAsyncThunk(
    "getMessage",
    async () => {
        try {
            const response = await get(`messages`);
            return response;
        } catch (error: any) {
            throw new Error(error.response.data);
        }
    }
);

const leadSlice = createSlice({
    name: 'lead',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLeadData.pending, (state) => {
                state.loading = 'pending';
                state.isLoader = true;
            })
            .addCase(getLeadData.fulfilled, (state, action) => {
                state.loading = 'fulfilled';
                state.LeadData = action.payload;
                state.error = null;
                state.isLoader = false;
            })
            .addCase(getLeadData.rejected, (state, action) => {
                state.isLoader = false;
                state.loading = 'rejected';
                state.error = action.payload as string;
            })
            .addCase(getLeadFilter.pending, (state) => {
                state.loading = 'pending';
                state.isLoader = true;
            })
            .addCase(getLeadFilter.fulfilled, (state, action) => {
                state.loading = 'fulfilled';
                state.LeadData = action.payload;
                state.error = null;
                state.isLoader = false;
            })
            .addCase(getLeadFilter.rejected, (state, action) => {
                state.isLoader = false;
                state.loading = 'rejected';
                state.error = action.payload as string;
            })
            .addCase(getSingleLead.pending, (state) => {
                state.loading = 'pending';
                state.isLoader = true;
            })
            .addCase(getSingleLead.fulfilled, (state, action) => {
                state.loading = 'fulfilled';
                state.SingleLead = action.payload;
                state.error = null;
                state.isLoader = false;
            })
            .addCase(getSingleLead.rejected, (state, action) => {
                state.isLoader = false;
                state.loading = 'rejected';
                state.error = action.payload as string;
            })
            .addCase(addLeadData.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(addLeadData.fulfilled, (state, action) => {
                state.loading = 'fulfilled';
                state.error = null;
            })
            .addCase(addLeadData.rejected, (state, action) => {
                state.loading = 'rejected';
                state.error = action.payload as string;
            })
            .addCase(updateLeadData.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(updateLeadData.fulfilled, (state, action) => {
                state.loading = 'fulfilled';
                state.error = null;
            })
            .addCase(updateLeadData.rejected, (state, action) => {
                state.loading = 'rejected';
                state.error = action.payload as string;
            })
            .addCase(addRelatedContactData.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(addRelatedContactData.fulfilled, (state, action) => {
                state.loading = 'fulfilled';
                state.error = null;
            })
            .addCase(addRelatedContactData.rejected, (state, action) => {
                state.loading = 'rejected';
                state.error = action.payload as string;
            })
            .addCase(deleteLeadsData.pending, (state) => {
                state.loading = 'pending';
                state.isdelLoader = true
            })
            .addCase(deleteLeadsData.fulfilled, (state, action) => {
                state.isdelLoader = false
                state.loading = 'fulfilled';
                state.error = null;
            })
            .addCase(deleteLeadsData.rejected, (state, action) => {
                state.isdelLoader = false
                state.loading = 'rejected';
                state.error = action.payload as string;
            })
            .addCase(deleteRelatedContactsData.pending, (state) => {
                state.loading = 'pending';
                state.isdelLoader = true
            })
            .addCase(deleteRelatedContactsData.fulfilled, (state, action) => {
                state.isdelLoader = false
                state.loading = 'fulfilled';
                state.error = null;
            })
            .addCase(deleteRelatedContactsData.rejected, (state, action) => {
                state.isdelLoader = false
                state.loading = 'rejected';
                state.error = action.payload as string;
            })
            .addCase(addTask.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.loading = 'fulfilled';
                state.error = null;
            })
            .addCase(addTask.rejected, (state, action) => {
                state.loading = 'rejected';
                state.error = action.payload as string;
            })
            .addCase(addEmail.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(addEmail.fulfilled, (state, action) => {
                state.loading = 'fulfilled';
                state.error = null;
            })
            .addCase(addEmail.rejected, (state, action) => {
                state.loading = 'rejected';
                state.error = action.payload as string;
            })
            .addCase(addMeeting.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(addMeeting.fulfilled, (state, action) => {
                state.loading = 'fulfilled';
                state.error = null;
            })
            .addCase(addMeeting.rejected, (state, action) => {
                state.loading = 'rejected';
                state.error = action.payload as string;
            })
            .addCase(addCall.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(addCall.fulfilled, (state, action) => {
                state.loading = 'fulfilled';
                state.error = null;
            })
            .addCase(addCall.rejected, (state, action) => {
                state.loading = 'rejected';
                state.error = action.payload as string;
            })
            .addCase(addMessage.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(addMessage.fulfilled, (state, action) => {
                state.loading = 'fulfilled';
                state.error = null;
            })
            .addCase(addMessage.rejected, (state, action) => {
                state.loading = 'rejected';
                state.error = action.payload as string;
            }).addCase(getMeetingData.pending, (state) => {
                state.loading = 'pending';
                state.isLoader = true;
            })
            .addCase(getMeetingData.fulfilled, (state, action) => {
                state.loading = 'fulfilled';
                state.meeting = action.payload;
                state.error = null;
                state.isLoader = false;
            })
            .addCase(getMeetingData.rejected, (state, action) => {
                state.isLoader = false;
                state.loading = 'rejected';
                state.error = action.payload as string;
            }).addCase(getEmail.pending, (state) => {
                state.loading = 'pending';
                state.isLoader = true;
            })
            .addCase(getEmail.fulfilled, (state, action) => {
                state.loading = 'fulfilled';
                state.email = action.payload;
                state.error = null;
                state.isLoader = false;
            })
            .addCase(getEmail.rejected, (state, action) => {
                state.isLoader = false;
                state.loading = 'rejected';
                state.error = action.payload as string;
            }).addCase(getLogCall.pending, (state) => {
                state.loading = 'pending';
                state.isLoader = true;
            })
            .addCase(getLogCall.fulfilled, (state, action) => {
                state.loading = 'fulfilled';
                state.call = action.payload;
                state.error = null;
                state.isLoader = false;
            })
            .addCase(getLogCall.rejected, (state, action) => {
                state.isLoader = false;
                state.loading = 'rejected';
                state.error = action.payload as string;
            }).addCase(getMessage.pending, (state) => {
                state.loading = 'pending';
                state.isLoader = true;
            })
            .addCase(getMessage.fulfilled, (state, action) => {
                state.loading = 'fulfilled';
                state.message = action.payload;
                state.error = null;
                state.isLoader = false;
            })
            .addCase(getMessage.rejected, (state, action) => {
                state.isLoader = false;
                state.loading = 'rejected';
                state.error = action.payload as string;
            })
    },
});

export default leadSlice.reducer;
