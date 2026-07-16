import api from "../lib/api";

export const loginUser = async (data) => {
  const response = await api.post("/users/login", data);
  return response.data;
};

export const registerUser = async (data) => {
  const response = await api.post("/users/signup", data);
  return response.data;
};