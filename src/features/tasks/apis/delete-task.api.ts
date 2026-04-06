import { todoApi } from '../../../api/todo.api';
import type { Task } from '../interfaces/task.interface';

export const DeleteTaskApi = async (id: string): Promise<Task> => {
    const response = await todoApi.delete<Task>(`/api/v1/tasks/${id}`);
    return response.data;
};