import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { RegisterRequest } from "../interfaces/register.request";
import { postRegister } from "../apis/post-register.api";

interface RegisterState {
    success: boolean;
    loading: boolean;
    error: string | null;    
}

const initialState: RegisterState = {
    success: false,
    loading: false,
    error: null
}

export const registerThunk = createAsyncThunk<
    void,
    RegisterRequest,
    { rejectValue: string }
>
(
    "auth/register"
    ,async (
        { email, password, name }: RegisterRequest,
        { rejectWithValue }
    ) => {
        try {
            await postRegister({email,password,name});
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

const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(registerThunk.pending, (state) => {
                state.loading = true;
                state.error = null;    
                state.success = false;    
            })
            .addCase(registerThunk.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload as string;
            });
    }
})

export const registerReducer = registerSlice.reducer;