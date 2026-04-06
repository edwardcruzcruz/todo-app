// src/features/tasks/components/TaskForm.tsx
import { useForm } from "react-hook-form";
import type { Task } from "../interfaces/task.interface";
//import { useEffect } from "react";

interface TaskFormProps {
  initialData?: Task; // If present, we are EDITING
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const TaskForm = ({ initialData, onSubmit, onCancel }: TaskFormProps) => {
  const { register, handleSubmit/*, reset*/ } = useForm({
    defaultValues: initialData || { title: "", description: "", completed: false }
  });

  /*useEffect(() => {
    console.log(initialData)
    reset(initialData || { title: "", description: "", completed: false });
  }, [initialData, reset]);*/

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="taskForm">
      <div>
        <label className="taskTitle">Título</label>
        <input {...register("title", { required: true })} className="taskTitleInput" />
      </div>
      <div>
        <label className="taskDescription">Descripción</label>
        <textarea {...register("description")} className="taskDescriptionTextArea" />
      </div>
      <div>
        <label className="taskCompleted">Completada</label>
        <input 
          type="checkbox" 
          id="completed"
          {...register("completed")} 
          className="taskCompletedInput"
        />
      </div>
      <div className="taskAction">
        <button type="button" onClick={onCancel} className="taskClose">Cancelar</button>
        <button type="submit" className="taskSave">
          {initialData ? "Actualizar" : "Guardar"}
        </button>
      </div>
    </form>
  );
};