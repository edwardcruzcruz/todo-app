import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "../features/auth/states/login.slice";
import { registerReducer } from "../features/auth/states/register.slice";
import { taskReducer } from "../features/tasks/states/task.slice";

export const store = configureStore({
    reducer: {
        login: loginReducer,
        register: registerReducer,
        task: taskReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;