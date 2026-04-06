import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchTasks } from "../states/task.slice";

export const useTasksTable = () => {
    const dispatch = useAppDispatch();
    const { tasks, loading, error } = useAppSelector(
        (state) => state.task
    );

    useEffect(() => {
        const loadTasks = async () => {
            await dispatch(fetchTasks())
        }
        loadTasks();
    }
    ,[])
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
        error
    };
}
