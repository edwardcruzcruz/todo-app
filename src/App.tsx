import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { LoginPage, RegisterPage } from "./features/auth/pages"
import { ProtectedRoute } from "./routes/ProtectedRoute"
import TasksPage from "./features/tasks/pages/TasksPage"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace/>}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>       
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <TasksPage />
            </ProtectedRoute>
          }/>       
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
