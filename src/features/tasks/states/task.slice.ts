import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Task } from "../interfaces/task.interface";
import { getAllTaskApi } from "../apis/get-tasks.api";

interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;    
}

const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null
}

export const fetchTasks = createAsyncThunk<
    Task[],
    void,
    { rejectValue: string }
>
(
    "tasks"
    ,async (
        _,
        { rejectWithValue }
    ) => {
        try {
            const response = await getAllTaskApi();
            return response;
        } catch (error) {
            if( axios.isAxiosError(error) ) {
                return rejectWithValue(
                    error.response?.data?.error || "Algo salio mal"
                );
            } else {
                return rejectWithValue("Algo salio mal");
            }
        }
    }
)

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;    
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
})

export const taskReducer = taskSlice.reducer;