"use client";

import { useFetch } from "./useFetch";
import { getMyConsignments } from "@/lib/consignments";

// pengajuan jual milik pembeli yang login. requests = null selama masih dimuat
export function useMyConsignments() {
  const { data, error, loading } = useFetch(getMyConsignments);
  return { requests: data, error, loading };
}
