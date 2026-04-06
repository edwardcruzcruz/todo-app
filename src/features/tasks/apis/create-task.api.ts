import { todoApi } from '../../../api/todo.api';
import type { Task } from '../interfaces/task.interface';

export const CreateTaskApi = async (title: string, description: string, completed: boolean): Promise<Task> => {
    const response = await todoApi.post<Task>('/api/v1/tasks',{
        title,
        description,
        completed
    });
    return response.data;
};