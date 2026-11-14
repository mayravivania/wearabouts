import { api } from "./api";
import { USE_MOCK } from "./config";

// GET /consignments/mine: pengajuan jual milik pembeli yang login. Mode contoh: kosong
export const getMyConsignments = async () => (USE_MOCK ? [] : api("/consignments/mine", { auth: true }));

// status dari backend -> label dan warna badge
export const CONSIGNMENT_STATUS = {
  pending: { label: "Under review", variant: "outline" },
  accepted: { label: "Accepted", variant: "gold" },
  rejected: { label: "Not accepted", variant: "outline" },
};
