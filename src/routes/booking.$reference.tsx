import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Download, Printer, CalendarPlus, XCircle, Plus } from "lucide-react";
import { toPng } from "html-to-image";
import { BookingCard } from "@/components/BookingCard";
import { cancelBooking, getBooking, toIcs, type Booking } from "@/lib/bookings";

export const Route = createFileRoute("/booking/$reference")({
  head: () => ({
    meta: [
      { title: "Your Booking Card — AnyoneClinic" },
      { name: "description", content: "Your AnyoneClinic appointment booking card and reference number." },
      { property: "og:title", content: "Booking Card — AnyoneClinic" },
      { property: "og:description", content: "View, print or add your AnyoneClinic appointment to your calendar." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BookingPage,
});

function BookingPage() {
  const { reference } = Route.useParams();
  const [b, setB] = useState<Booking | null | undefined>(undefined);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => setB(getBooking(reference) ?? null), [reference]);

  if (b === undefined) return <div className="p-10 text-center text-muted-foreground">Loading…</div>;
  if (b === null)
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="text-2xl">Booking not found</h1>
        <p className="mt-2 text-muted-foreground">We couldn't find {reference} on this device.</p>
        <div className="mt-6 flex justify-center gap-3"><Link to="/manage" className="pill pill-outline">Look up booking</Link><Link to="/book" className="pill pill-cta">Book now</Link></div>
      </div>
    );

  const download = async () => {
    if (!ref.current) return;
    const url = await toPng(ref.current, { pixelRatio: 2 });
    const a = document.createElement("a"); a.href = url; a.download = `${b.reference}.png`; a.click();
  };
  const ics = () => {
    const url = URL.createObjectURL(new Blob([toIcs(b)], { type: "text/calendar" }));
    const a = document.createElement("a"); a.href = url; a.download = `${b.reference}.ics`; a.click();
    URL.revokeObjectURL(url);
  };
  const cancel = () => {
    if (!confirm("Cancel this booking?")) return;
    cancelBooking(b.reference); setB(getBooking(b.reference) ?? null);
  };
  const active = b.status === "Confirmed";

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="no-print text-3xl">{active ? "You're booked!" : "Booking cancelled"}</h1>
      <p className="no-print mt-1 text-muted-foreground">Save your reference number and show this card at the clinic.</p>
      <div className="mt-6"><BookingCard ref={ref} booking={b} /></div>
      <div className="no-print mt-6 flex flex-wrap gap-2">
        <button className="pill pill-primary" onClick={download}><Download className="h-4 w-4" />Download image</button>
        <button className="pill pill-outline" onClick={() => window.print()}><Printer className="h-4 w-4" />Print / PDF</button>
        {active && <button className="pill pill-outline" onClick={ics}><CalendarPlus className="h-4 w-4" />Add to calendar</button>}
        {active && <button className="pill pill-outline text-destructive" onClick={cancel}><XCircle className="h-4 w-4" />Cancel booking</button>}
        <Link to="/book" className="pill pill-cta"><Plus className="h-4 w-4" />Book another</Link>
      </div>
    </div>
  );
}
