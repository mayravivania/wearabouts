import { API_URL } from "./config";

const TOKEN_KEY = "wearabouts_token";

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    // localStorage diblokir (mode private), abaikan
  }
}

// simpan status HTTP supaya UI bisa bedakan 401, 409, dll
export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

// semua request ke backend lewat sini. body: object (JSON) atau FormData (upload foto)
export async function api(path, { method = "GET", body, auth = false } = {}) {
  const headers = {};
  const isForm = typeof FormData !== "undefined" && body instanceof FormData;

  if (body && !isForm) headers["Content-Type"] = "application/json";
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
    });
  } catch {
    throw new ApiError("Can't reach the server. Try again in a moment.", 0);
  }

  const json = await res.json().catch(() => ({}));
  // token kedaluwarsa (1 hari) atau tidak valid: anggap logout
  if (res.status === 401 && auth && typeof window !== "undefined") {
    window.dispatchEvent(new Event("wearabouts:unauthorized"));
  }
  if (!res.ok || json.success === false) {
    throw new ApiError(json.message || "Something went wrong", res.status);
  }
  return json.data;
}
