import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { getBooking } from "@/lib/bookings";

export const Route = createFileRoute("/manage")({
  head: () => ({
    meta: [
      { title: "Manage Booking — AnyoneClinic" },
      { name: "description", content: "Look up, view or cancel your AnyoneClinic appointment with your reference and mobile number." },
      { property: "og:title", content: "Manage Booking — AnyoneClinic" },
      { property: "og:description", content: "View or cancel your AnyoneClinic appointment." },
    ],
  }),
  component: Manage,
});

function Manage() {
  const navigate = useNavigate();
  const [refNo, setRefNo] = useState("");
  const [mobile, setMobile] = useState("");
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refNo.trim() || !mobile.trim()) return setErr("Please enter both your reference number and mobile number.");
    const b = getBooking(refNo.trim());
    if (!b || b.mobile !== mobile.replace(/[\s-]/g, "")) return setErr("No booking matches those details. Please double-check and try again.");
    navigate({ to: "/booking/$reference", params: { reference: b.reference } });
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-3xl">Manage your booking</h1>
      <p className="mt-2 text-muted-foreground">View your booking card or cancel your appointment.</p>
      <form onSubmit={submit} className="mt-6 space-y-4 rounded-3xl bg-card p-6 shadow-soft" noValidate>
        <div>
          <label htmlFor="ref" className="mb-1 block text-sm font-semibold">Reference number</label>
          <input id="ref" className="field uppercase" placeholder="AC-XXXXXX" value={refNo} onChange={(e) => setRefNo(e.target.value)} />
        </div>
        <div>
          <label htmlFor="mob" className="mb-1 block text-sm font-semibold">Mobile number</label>
          <input id="mob" type="tel" className="field" placeholder="0917 123 4567" value={mobile} onChange={(e) => setMobile(e.target.value)} />
        </div>
        {err && <p role="alert" className="text-sm font-medium text-destructive">{err}</p>}
        <button type="submit" className="pill pill-cta w-full">Find booking</button>
      </form>
    </div>
  );
}
