import { TasksTable } from "../components/TasksTable";
import { useTasksTable } from "../hooks/useTasksTable";

const TasksPage = () => {
  const { tasks } = useTasksTable();
  return (
    <div>
      <h1>Tareas</h1>
      <TasksTable data={tasks}/>
    </div>
  )
}
export default TasksPage;