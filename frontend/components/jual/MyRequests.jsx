"use client";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useMyConsignments } from "@/hooks/useMyConsignments";
import { CONSIGNMENT_STATUS } from "@/lib/consignments";
import { formatDate } from "@/lib/date";
import { formatIDR, photoUrl } from "@/lib/format";


const STATUS_NOTE = {
  pending: "We are looking at your photos. You will hear from us within 3 working days.",
  accepted: "We would love to list this piece. We will reach you through the contact you left.",
  rejected: "We could not take this piece this time.",
};

export default function MyRequests() {
  const { requests, error, loading } = useMyConsignments();

  if (loading) return <p className="text-fg-2 py-16">Loading...</p>;
  if (error) return <p className="text-stamp py-16">{error}</p>;

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-start gap-5 py-10">
        <p className="text-lg text-fg-2">You have not sent us anything to sell yet.</p>
        <Button href="/jual">Sell with us</Button>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-6 max-w-3xl">
      {requests.map((request) => {
        const status = CONSIGNMENT_STATUS[request.status] || { label: request.status, variant: "outline" };
        const photo = photoUrl(request.photos?.[0]);

        return (
          <li key={request._id} className="flex flex-col gap-5 rounded-2xl border border-line p-5 sm:flex-row">
            {photo && (
              
              <img src={photo} alt="" className="size-28 shrink-0 rounded-md object-cover bg-photo" />
            )}

            <div className="flex flex-1 flex-col gap-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-fg-2">Sent {formatDate(request.createdAt)}</p>
                  <p className="font-display text-2xl">{request.name}</p>
                </div>
                <Badge variant={status.variant}>{status.label}</Badge>
              </div>

              <p className="text-sm text-fg-2">
                {[request.brand, request.size, request.condition].filter(Boolean).join(" · ")} · asking {formatIDR(request.askingPrice)}
              </p>

              {STATUS_NOTE[request.status] && <p className="text-fg-2">{STATUS_NOTE[request.status]}</p>}

              {request.adminNote && (
                <p className="text-sm border-l-2 border-gold pl-4">
                  <span className="text-fg-2">Note from us:</span> {request.adminNote}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
