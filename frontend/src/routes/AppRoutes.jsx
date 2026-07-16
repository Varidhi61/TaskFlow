import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/dashboard/Dashboard";
import Projects from "../pages/projects/Projects";
import Tasks from "../pages/tasks/Tasks";
import Kanban from "../pages/kanban/Kanban";
import Users from "../pages/users/Users";

import ProtectedRoute from "./ProtectedRoute";
import Settings from "../pages/settings/Settings";
function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Authentication */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/kanban"
          element={
            <ProtectedRoute>
              <Kanban />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
  path="/settings"
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
/>
      </Routes>

    </BrowserRouter>

  );

}

export default AppRoutes;