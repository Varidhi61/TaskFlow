import api from "../lib/api";

export async function getRecentActivity() {

  const res = await api.get("/activity");

  return res.data;

}