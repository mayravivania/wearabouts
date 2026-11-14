"use client";

import { useFetch } from "./useFetch";
import { getMyOrders } from "@/lib/orders";

// pesanan milik pembeli yang login. orders = null selama masih dimuat
export function useOrders() {
  const { data, error, loading, reload } = useFetch(getMyOrders);
  return { orders: data, error, loading, reload };
}
