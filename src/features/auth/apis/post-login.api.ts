import { todoApi } from "../../../api/todo.api";
import type { LoginRequest } from "../interfaces/login.request";
import type { LoginResponse } from "../interfaces/login.response";

export const postLogin = async ( {email, password}:LoginRequest ): Promise<LoginResponse> => {
    const response = await todoApi.post<LoginResponse>('/api/v1/auth/login',
    {
        email,
        password
    })
    return response.data;
};