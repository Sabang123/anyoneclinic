import { Link } from "@tanstack/react-router";
import { FlaskConical, ScanLine, HeartHandshake, ClipboardCheck } from "lucide-react";
import { SERVICES } from "@/lib/bookings";

const icons = { lab: FlaskConical, xray: ScanLine, hiv: HeartHandshake, checkup: ClipboardCheck } as const;

export function ServicesGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {SERVICES.map((s) => {
        const Icon = icons[s.id as keyof typeof icons];
        return (
          <article key={s.id} className="flex flex-col rounded-3xl bg-card p-6 shadow-soft">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand">
              <Icon className="h-6 w-6 text-primary-foreground" />
            </span>
            <h3 className="mt-4 text-lg">{s.name}</h3>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.desc}</p>
            <div className="mt-4 flex justify-between text-xs font-semibold text-muted-foreground">
              <span>{s.duration}</span><span className="text-accent">{s.price}</span>
            </div>
            <Link to="/book" search={{ service: s.id }} className="pill pill-primary mt-4">Book this</Link>
          </article>
        );
      })}
    </div>
  );
}
