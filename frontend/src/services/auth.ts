// src/services/auth.ts
import api from "./api";

export const register = (data: { username: string; password: string }) =>
  api.post("/users/register", data);

export const login = (data: { username: string; password: string }) =>
  api.post("/users/login", data);