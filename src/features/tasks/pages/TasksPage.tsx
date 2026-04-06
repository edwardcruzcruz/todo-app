import { TaskForm } from "../components/TaskForm";
import { TasksTable } from "../components/TasksTable";
import { useTasksTable } from "../hooks/useTasksTable";

const TasksPage = () => {
  const { tasks, isModalOpen, selectedTask, handleOpenCreate, handleCloseModal, handleSave } = useTasksTable();
  return (
    <div>
      <h1>Tareas</h1>
      <div className="createTaskContainer">
        <button onClick={handleOpenCreate} className="createButton">
          crear tarea
        </button>
      </div>
      <TasksTable data={tasks}/>
      {isModalOpen && (
        <div className="modalContainer">
          <div className="modalContainerBody">
            <h2 className="text-xl font-bold mb-4">
              {selectedTask ? "Editar Tarea" : "Crear Nueva Tarea"}
            </h2>
            
            <TaskForm 
              initialData={selectedTask} 
              onSubmit={handleSave} 
              onCancel={handleCloseModal} 
            />
          </div>
        </div>
      )}
    </div>
  )
}
export default TasksPage;