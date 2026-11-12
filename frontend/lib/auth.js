"use client";

import { useSyncExternalStore } from "react";
import { api, setToken } from "./api";
import { USE_MOCK } from "./config";

const USER_KEY = "wearabouts_user";
const CHANGE = "wearabouts:auth";

// user disimpan di localStorage bareng token: { id, name, role }
function readUser() {
  try {
    return localStorage.getItem(USER_KEY);
  } catch {
    return null;
  }
}

function save(token, user) {
  setToken(token);
  try {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  } catch {
    // localStorage diblokir, abaikan
  }
  window.dispatchEvent(new Event(CHANGE));
}

function subscribe(callback) {
  const onUnauthorized = () => save(null, null);
  window.addEventListener(CHANGE, callback);
  window.addEventListener("storage", callback); // tab lain login/logout
  window.addEventListener("wearabouts:unauthorized", onUnauthorized);
  return () => {
    window.removeEventListener(CHANGE, callback);
    window.removeEventListener("storage", callback);
    window.removeEventListener("wearabouts:unauthorized", onUnauthorized);
  };
}

// user: null kalau belum login. ready: false selama render di server
export function useAuth() {
  const raw = useSyncExternalStore(subscribe, readUser, () => undefined);
  let user = null;
  try {
    user = raw ? JSON.parse(raw) : null;
  } catch {
    user = null;
  }
  return { user, ready: raw !== undefined };
}

export async function login(email, password) {
  if (USE_MOCK) {
    const user = { id: "mock", name: email.split("@")[0], role: email.startsWith("admin") ? "admin" : "buyer" };
    save("mock-token", user);
    return user;
  }
  const data = await api("/auth/login", { method: "POST", body: { email, password } });
  save(data.token, data.user);
  return data.user;
}

// backend register tidak mengembalikan token, jadi langsung login setelahnya
export async function register(name, email, password) {
  if (!USE_MOCK) await api("/auth/register", { method: "POST", body: { name, email, password } });
  return login(email, password);
}

export function logout() {
  save(null, null);
}
