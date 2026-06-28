import apiClient from "./apiClient";

export const getMe = async () => {
  try {
    const res = await apiClient.get("/auth/me");
    return res.data.user;
  } catch {
    return null;
  }
};

export const logout = async () => {
  try {
    await apiClient.post("/auth/logout");
  } catch {}
};
