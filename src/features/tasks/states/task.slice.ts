import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { Task } from "../interfaces/task.interface";
import { getAllTaskApi } from "../apis/get-tasks.api";
import type { CreateTaskRequest } from "../interfaces/create-task.request";
import { CreateTaskApi } from "../apis/create-task.api";
import { UpdateTaskApi } from "../apis/update-task.api";

interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;   
    selectedTask?: Task; // Used for the Edit Modal
    isModalOpen: boolean; 
}

const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
    isModalOpen: false
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

export const createTask = createAsyncThunk<
    Task,
    CreateTaskRequest,
    { rejectValue: string }
>
(
    "createTask"
    ,async (
        { title, description, completed}: CreateTaskRequest,
        { rejectWithValue }
    ) => {
        try {
            const response = await CreateTaskApi(title, description, completed);
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

export const updateTask = createAsyncThunk<
    Task,
    CreateTaskRequest& { id: string },
    { rejectValue: string }
>
(
    "updateTask"
    ,async (
        { id, title, description, completed},
        { rejectWithValue }
    ) => {
        try {
            const response = await UpdateTaskApi(id, title, description, completed);
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
    reducers:{
        openModal: (state, action: PayloadAction<Task | null>) => {
          state.isModalOpen = true;
          state.selectedTask = action.payload ?? undefined; // null = Crear, task = Editar
        },
        closeModal: (state) => {
          state.isModalOpen = false;
          state.selectedTask = undefined;
        }
    },
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
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.tasks.unshift(action.payload);
                state.isModalOpen = false;
                state.selectedTask = undefined;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
                state.isModalOpen = false;
                state.selectedTask = undefined;
            });
    }
})

export const { openModal, closeModal } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;