import { api, ApiError } from "./api";
import { USE_MOCK } from "./config";
import { MOCK_ITEMS } from "./mock-items";

// filters sama dengan query GET /items: q, category, size, status, min, max
export async function getItems(filters = {}) {
  if (USE_MOCK) return filterMock(filters);

  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== "" && value !== undefined && value !== null) params.set(key, value);
  });
  const query = params.toString();
  return api(`/items${query ? `?${query}` : ""}`);
}

export async function getItem(id) {
  if (USE_MOCK) {
    const item = MOCK_ITEMS.find((i) => i._id === id);
    if (!item) throw new ApiError("Piece not found", 404);
    return item;
  }
  return api(`/items/${id}`);
}

function filterMock({ q, category, size, status, min, max }) {
  return MOCK_ITEMS.filter((item) => {
    if (q && !item.name.toLowerCase().includes(q.toLowerCase())) return false;
    if (category && item.category !== category) return false;
    if (size && item.size !== size) return false;
    if (status && item.status !== status) return false;
    if (min && item.price < Number(min)) return false;
    if (max && item.price > Number(max)) return false;
    return true;
  });
}
