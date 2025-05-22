// src/services/activity.ts
import api from "./api";

export const getActivities = () => api.get("/activities");
export const createActivity = (data: any) => api.post("/activities", data);
export const updateActivityStatus = (id: number, status: string) =>
  api.patch(`/activities/${id}/status`, { status });
export const updateActivity = (id: number, data: any) =>
  api.put(`/activities/${id}`, data);
export const deleteActivity = (id: number) => api.delete(`/activities/${id}`);