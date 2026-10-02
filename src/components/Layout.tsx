import { Link } from "@tanstack/react-router";
import { Plus, CalendarPlus } from "lucide-react";
import { CLINIC } from "@/lib/bookings";

export function Logo({ light = true }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2 font-extrabold text-lg">
      <span className={`grid h-9 w-9 place-items-center rounded-xl ${light ? "bg-primary-foreground/20" : "bg-brand"}`}>
        <Plus className="h-6 w-6 text-primary-foreground" strokeWidth={4} />
      </span>
      <span className={light ? "text-primary-foreground" : "text-foreground"}>AnyoneClinic</span>
    </Link>
  );
}

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/book", label: "Book Appointment" },
  { to: "/manage", label: "Manage Booking" },
] as const;

export function Header() {
  return (
    <header className="no-print sticky top-0 z-40 bg-brand shadow-soft">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }}
              className="rounded-full px-3 py-1.5 text-sm font-semibold text-primary-foreground/85 hover:bg-primary-foreground/15"
              activeProps={{ className: "bg-primary-foreground/20 text-primary-foreground" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <Link to="/book" className="pill pill-light hidden sm:inline-flex">Book Now</Link>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-3 pb-2 md:hidden">
        {nav.map((n) => (
          <Link key={n.to} to={n.to} activeOptions={{ exact: true }}
            className="whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold text-primary-foreground/85"
            activeProps={{ className: "bg-primary-foreground/20 text-primary-foreground" }}>
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="no-print mt-16 bg-brand text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-3 text-sm opacity-85">Accessible diagnostics and care for Borongan City and Eastern Samar.</p>
        </div>
        <div className="text-sm opacity-90 space-y-1">
          <p className="font-bold">Visit us</p>
          <p>{CLINIC.address}</p>
          <p>{CLINIC.hours}</p>
        </div>
        <div className="text-sm opacity-90 space-y-1">
          <p className="font-bold">Contact</p>
          <p>{CLINIC.phone}</p>
          <p>{CLINIC.email}</p>
        </div>
      </div>
      <p className="border-t border-primary-foreground/20 py-4 text-center text-xs opacity-85">
        This is a demo. Appointments are not actually submitted. © {new Date().getFullYear()} AnyoneClinic
      </p>
    </footer>
  );
}

export function FloatingBook() {
  return (
    <Link to="/book" className="no-print pill pill-cta fixed bottom-4 right-4 z-50 sm:hidden">
      <CalendarPlus className="h-4 w-4" /> Book Now
    </Link>
  );
}

export function DemoBanner() {
  return (
    <div className="no-print bg-secondary px-4 py-2 text-center text-xs font-semibold text-secondary-foreground">
      This is a demo. Appointments are not actually submitted.
    </div>
  );
}
