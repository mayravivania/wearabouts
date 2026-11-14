import { api } from "./api";

// semua fungsi di sini butuh token admin

// body: FormData (multipart karena ada foto)
export const createItem = (body) => api("/items", { method: "POST", body, auth: true });
export const updateItem = (id, body) => api(`/items/${id}`, { method: "PUT", body, auth: true });
export const deleteItem = (id) => api(`/items/${id}`, { method: "DELETE", auth: true });

export const getAllOrders = () => api("/orders", { auth: true });
export const updateOrderStatus = (id, status) =>
  api(`/orders/${id}/status`, { method: "PATCH", body: { status }, auth: true });

// alur status yang diizinkan backend
export const NEXT_STATUS = {
  pending: ["paid", "cancelled"],
  paid: ["shipped", "cancelled"],
  shipped: ["completed"],
  completed: [],
  cancelled: [],
};

export const getConsignments = (status = "") => api(`/consignments${status ? `?status=${status}` : ""}`, { auth: true });
export const reviewConsignment = (id, status, adminNote = "") =>
  api(`/consignments/${id}`, { method: "PATCH", body: { status, adminNote }, auth: true });
