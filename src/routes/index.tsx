import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarCheck, ClipboardList, BadgeCheck, Clock, MapPin, Phone, Mail, Utensils, IdCard } from "lucide-react";
import { ServicesGrid } from "@/components/ServicesGrid";
import { CLINIC } from "@/lib/bookings";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AnyoneClinic — Book Lab, X-ray & Check-ups in Borongan City" },
      { name: "description", content: "Book clinical lab tests, X-ray, confidential HIV testing and check-up packages online at AnyoneClinic, Borongan City, Eastern Samar." },
      { property: "og:title", content: "AnyoneClinic — Online Appointment Booking" },
      { property: "og:description", content: "Skip the line. Book your clinic visit in Borongan City in minutes." },
    ],
  }),
  component: Index,
});

const steps = [
  { icon: ClipboardList, title: "Choose a service", text: "Pick a lab test, X-ray, HIV testing or a check-up package." },
  { icon: CalendarCheck, title: "Pick date & time", text: "Select an open slot Monday to Saturday." },
  { icon: BadgeCheck, title: "Get your booking card", text: "Show your reference number at the front desk." },
];

function Index() {
  return (
    <>
      <section className="bg-brand text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <p className="inline-block rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-bold">Borongan City, Eastern Samar</p>
          <h1 className="mt-4 max-w-2xl text-4xl leading-tight md:text-6xl">Care for anyone, booked in minutes.</h1>
          <p className="mt-4 max-w-xl text-lg opacity-90">Reserve your lab test, X-ray or check-up online and skip the long wait at the clinic.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/book" className="pill pill-light">Book Appointment</Link>
            <Link to="/manage" className="pill border-2 border-primary-foreground/50">Manage Booking</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-8 max-w-6xl px-4">
        <ServicesGrid />
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-16">
        <h2 className="text-3xl">How it works</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-3xl bg-card p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-accent font-extrabold text-accent-foreground">{i + 1}</span>
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-4 pt-16 md:grid-cols-2">
        <div className="rounded-3xl bg-card p-6 shadow-soft">
          <h2 className="text-2xl">Preparation tips</h2>
          <ul className="mt-4 space-y-4 text-sm">
            <li className="flex gap-3"><Utensils className="h-5 w-5 shrink-0 text-accent" /><span><b>Fasting:</b> For FBS and lipid profile, fast 8–12 hours. Water is allowed.</span></li>
            <li className="flex gap-3"><IdCard className="h-5 w-5 shrink-0 text-accent" /><span><b>Bring:</b> A valid ID, your booking reference, and your doctor's request if you have one.</span></li>
            <li className="flex gap-3"><Clock className="h-5 w-5 shrink-0 text-accent" /><span><b>Arrive early:</b> Come 15 minutes before your slot. Wear loose clothing for X-rays.</span></li>
          </ul>
        </div>
        <div className="rounded-3xl bg-card p-6 shadow-soft">
          <h2 className="text-2xl">Clinic info</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-accent" />{CLINIC.address}</li>
            <li className="flex gap-3"><Clock className="h-5 w-5 shrink-0 text-accent" />{CLINIC.hours}</li>
            <li className="flex gap-3"><Phone className="h-5 w-5 shrink-0 text-accent" />{CLINIC.phone}</li>
            <li className="flex gap-3"><Mail className="h-5 w-5 shrink-0 text-accent" />{CLINIC.email}</li>
          </ul>
          <div className="mt-4 grid h-40 place-items-center rounded-2xl border-2 border-dashed bg-muted text-sm font-semibold text-muted-foreground">
            [Map placeholder]
          </div>
        </div>
      </section>
    </>
  );
}
