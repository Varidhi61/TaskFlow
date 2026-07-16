import api from "../lib/api";

export async function getKanbanBoard() {
  const res = await api.get("/tasks/kanban/board");
  return res.data;
}

export async function getKanbanSummary() {
  const res = await api.get("/tasks/kanban/summary");
  return res.data;
}

export async function updateKanbanStatus(id, status) {
  const res = await api.patch(
    `/tasks/${id}/status`,
    null,
    {
      params: {
        status,
      },
    }
  );

  return res.data;
}