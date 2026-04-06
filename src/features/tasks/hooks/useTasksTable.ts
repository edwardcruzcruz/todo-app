import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { closeModal, createTask, fetchTasks, openModal } from "../states/task.slice";
import type { Task } from "../interfaces/task.interface";
import type { CreateTaskRequest } from "../interfaces/create-task.request";

export const useTasksTable = () => {
    const dispatch = useAppDispatch();
    const { tasks, loading, error, isModalOpen, selectedTask } = useAppSelector(
        (state) => state.task
    );

    const handleOpenCreate = () => dispatch(openModal(null));
    const handleOpenEdit = (task: Task) => dispatch(openModal(task));
    const handleCloseModal = () => dispatch(closeModal());

    useEffect(() => {
        const loadTasks = async () => {
            await dispatch(fetchTasks())
        }
        loadTasks();
    }
    ,[])

    const handleSave = (data: CreateTaskRequest) => {
        if (selectedTask) {
          // dispatch(updateTask({ id: selectedTask.id, ...data }));
        } else {
            // Map the form data to the CreateTaskRequest structure
            dispatch(createTask({
              title: data.title,
              description: data.description,
              completed: data.completed
            }));
        }
    }
    /*useEffect(() => {
        //const loadTasks = async() => {
        //  const res = await fetchTasks({page, limit, search, status});
        //  setData(res.data)
        //  setData(res.total)
        //}
        //loadTasks()
        //[page, search, status]
    }, [])*/
    
    return {
        tasks,
        loading,
        error,
        isModalOpen,
        selectedTask,
        handleOpenCreate,
        handleOpenEdit,
        handleCloseModal,
        handleSave
    };
}
