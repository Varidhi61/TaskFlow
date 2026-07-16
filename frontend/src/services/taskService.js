import api from "../lib/api";

// Get All Tasks
export async function getTasks() {
  const response = await api.get("/tasks");
  return response.data;
}

// Get Single Task
export async function getTask(id) {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
}

// Create Task
export async function createTask(data) {
  const response = await api.post("/tasks", data);
  return response.data;
}

// Update Task
export async function updateTask(id, data) {
  const response = await api.put(`/tasks/${id}`, data);
  return response.data;
}

// Delete Task
export async function deleteTask(id) {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
}

// Change Task Status
export async function updateTaskStatus(id, status) {
  const response = await api.patch(
    `/tasks/${id}/status?status=${status}`
  );

  return response.data;
}