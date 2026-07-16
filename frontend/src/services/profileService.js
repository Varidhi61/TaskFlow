import api from "../lib/api";

export async function getProfile() {
  const res = await api.get("/profile/me");
  return res.data;
}

export async function updateProfile(data) {
  const res = await api.put("/profile/me", data);
  return res.data;
}

export async function changePassword(data) {
  const res = await api.put(
    "/profile/change-password",
    data
  );
  return res.data;
}