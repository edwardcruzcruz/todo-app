import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { LoginRequest } from "../interfaces/login.request";
import axios from "axios";
import { postLogin } from "../apis/post-login.api";

interface LoginState {
    token: string | null;
    loading: boolean;
    error: string | null;    
}

const initialState: LoginState = {
    token: localStorage.getItem("token"),
    loading: false,
    error: null
}

export const loginThunk = createAsyncThunk<
    string,
    LoginRequest,
    { rejectValue: string }
>
(
    "auth/login"
    ,async (
        { email, password }: LoginRequest,
        { rejectWithValue }
    ) => {
        try {
            const data = await postLogin({email,password});
            return data.token;
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

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers:{
        logout: ( state ) => {
            state.token = null;
            localStorage.removeItem("token")
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
                state.error = null;    
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
                localStorage.setItem("token",action.payload);
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
})

export const { logout } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;