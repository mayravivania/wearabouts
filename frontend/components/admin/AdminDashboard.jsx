"use client";

import { useState } from "react";
import AdminItems from "./AdminItems";
import AdminOrders from "./AdminOrders";
import AdminConsignments from "./AdminConsignments";

const TABS = [
  { id: "items", label: "Pieces", View: AdminItems },
  { id: "orders", label: "Orders", View: AdminOrders },
  { id: "sell", label: "Sell requests", View: AdminConsignments },
];

export default function AdminDashboard() {
  const [active, setActive] = useState("items");
  const { View } = TABS.find((t) => t.id === active);

  return (
    <div className="flex flex-col gap-8">
      <div role="tablist" aria-label="Admin sections" className="flex gap-6 border-b border-line">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={active === t.id}
            aria-controls="admin-panel"
            onClick={() => setActive(t.id)}
            className={`py-3 text-[15px] border-b-2 -mb-px transition-colors ${active === t.id ? "border-fg" : "border-transparent text-fg-2 hover:text-fg"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div id="admin-panel" role="tabpanel" aria-labelledby={`tab-${active}`}>
        <View />
      </div>
    </div>
  );
}
