import { todoApi } from '../../../api/todo.api';
import type { RegisterRequest } from '../interfaces/register.request';
import type { User } from '../interfaces/user.interface';

export const postRegister = async ( {email,password,name}: RegisterRequest ): Promise<User> => {
    const response = await todoApi.post<User>('/api/v1/auth/register',
    {
        email,
        password,
        name
    });
    return response.data;
};