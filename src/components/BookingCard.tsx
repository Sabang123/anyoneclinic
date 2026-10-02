import { forwardRef } from "react";
import { Plus, QrCode } from "lucide-react";
import { CLINIC, formatDate, serviceName, type Booking } from "@/lib/bookings";

export const BookingCard = forwardRef<HTMLDivElement, { booking: Booking }>(({ booking: b }, ref) => {
  const ok = b.status === "Confirmed";
  return (
    <div ref={ref} className="overflow-hidden rounded-3xl bg-card shadow-soft">
      <div className="flex items-center justify-between bg-brand px-6 py-5 text-primary-foreground">
        <div className="flex items-center gap-2 text-lg font-extrabold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-foreground/20"><Plus className="h-6 w-6" strokeWidth={4} /></span>
          AnyoneClinic
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${ok ? "bg-success text-primary-foreground" : "bg-destructive text-destructive-foreground"}`}>{b.status}</span>
      </div>
      <div className="grid gap-6 p-6 sm:grid-cols-[1fr_auto]">
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-xs font-semibold uppercase text-muted-foreground">Reference no.</p>
            <p className="text-2xl font-extrabold tracking-wider">{b.reference}</p>
          </div>
          <Row k="Service" v={serviceName(b.serviceId)} />
          <Row k="Date & time" v={`${formatDate(b.date)} · ${b.time}`} />
          <Row k="Patient" v={`${b.name} (${b.age}, ${b.sex})`} />
          <Row k="Contact" v={`${b.mobile}${b.email ? " · " + b.email : ""}`} />
          <Row k="Clinic" v={`${CLINIC.name} — ${CLINIC.address}`} />
        </div>
        <div className="grid h-36 w-36 place-items-center self-center rounded-2xl border-2 border-dashed text-center text-muted-foreground">
          <div><QrCode className="mx-auto h-16 w-16" /><p className="text-[10px] font-semibold">QR placeholder</p></div>
        </div>
      </div>
      <p className="border-t px-6 py-3 text-xs text-muted-foreground">Please arrive 15 minutes early and bring a valid ID. Demo only — not an actual appointment.</p>
    </div>
  );
});
BookingCard.displayName = "BookingCard";

function Row({ k, v }: { k: string; v: string }) {
  return <div><p className="text-xs font-semibold uppercase text-muted-foreground">{k}</p><p className="font-semibold">{v}</p></div>;
}
