import { todoApi } from '../../../api/todo.api';
import type { Task } from '../interfaces/task.interface';

export const getAllTaskApi = async (): Promise<Task[]> => {
    const response = await todoApi.get<Task[]>('/api/v1/tasks');
    return response.data;
};