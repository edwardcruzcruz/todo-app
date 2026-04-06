import { todoApi } from '../../../api/todo.api';
import type { Task } from '../interfaces/task.interface';

export const UpdateTaskApi = async (id: string, title: string, description: string, completed: boolean): Promise<Task> => {
    const response = await todoApi.put<Task>(`/api/v1/tasks/${id}`,{
        title,
        description,
        completed
    });
    return response.data;
};