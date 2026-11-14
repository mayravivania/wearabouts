"use client";

import { useCallback, useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useFetch } from "@/hooks/useFetch";
import { getConsignments, reviewConsignment } from "@/lib/admin";
import { formatIDR, photoUrl } from "@/lib/format";

const FILTERS = ["pending", "accepted", "rejected"];

// pengajuan titip jual dari halaman Sell with us. Accept atau Reject lewat PATCH /consignments/:id
export default function AdminConsignments() {
  const [filter, setFilter] = useState("pending");
  const load = useCallback(() => getConsignments(filter), [filter]);
  const { data: requests, error, loading, reload } = useFetch(load);
  const [notes, setNotes] = useState({});
  const [busy, setBusy] = useState("");
  const [actionError, setActionError] = useState("");

  async function decide(id, status) {
    setBusy(id);
    setActionError("");
    try {
      await reviewConsignment(id, status, notes[id] || "");
      reload();
    } catch (err) {
      setActionError(err.message);
    } finally {
      setBusy("");
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
        {FILTERS.map((s) => (
          <Button key={s} variant={filter === s ? undefined : "secondary"} className="min-h-11 capitalize" onClick={() => setFilter(s)}>
            {s}
          </Button>
        ))}
      </div>

      {actionError && (
        <p className="text-stamp" role="alert">
          {actionError}
        </p>
      )}
      {loading && <p className="text-fg-2">Loading...</p>}
      {error && <p className="text-stamp">{error}</p>}
      {!loading && !error && requests.length === 0 && <p className="text-fg-2">No {filter} requests.</p>}

      <ul className="flex flex-col gap-4 max-w-3xl">
        {(requests || []).map((c) => (
          <li key={c._id} className="flex flex-col gap-3 rounded-2xl border border-line p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <p className="font-display text-xl">{c.name}</p>
                <p className="text-sm text-fg-2">
                  {[c.brand, c.category, c.size, c.condition].filter(Boolean).join(" · ")} · asking {formatIDR(c.askingPrice)}
                </p>
                <p className="text-sm text-fg-2">
                  From {c.seller?.name} ({c.seller?.email}), contact: {c.contact}
                </p>
              </div>
              <Badge variant={c.status === "pending" ? "outline" : "gold"}>{c.status}</Badge>
            </div>

            {c.description && <p className="text-fg-2">{c.description}</p>}

            {c.photos?.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {c.photos.map((p) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={p} src={photoUrl(p)} alt="" className="size-20 rounded-md object-cover bg-photo" />
                ))}
              </div>
            )}

            {c.adminNote && <p className="text-sm text-fg-2">Note: {c.adminNote}</p>}

            {c.status === "pending" && (
              <div className="flex flex-wrap items-center gap-3">
                <input
                  aria-label="Note to the seller"
                  placeholder="Note to the seller (optional)"
                  value={notes[c._id] || ""}
                  onChange={(e) => setNotes((n) => ({ ...n, [c._id]: e.target.value }))}
                  className="min-h-11 flex-1 min-w-52 rounded-md border border-line bg-bg px-4 text-[15px] focus:border-fg focus:outline-none"
                />
                <Button className="min-h-11" disabled={busy === c._id} onClick={() => decide(c._id, "accepted")}>
                  Accept
                </Button>
                <Button variant="secondary" className="min-h-11" disabled={busy === c._id} onClick={() => decide(c._id, "rejected")}>
                  Reject
                </Button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
