export type Service = { id: string; name: string; desc: string; duration: string; price: string };

export const SERVICES: Service[] = [
  { id: "lab", name: "Clinical Laboratory Tests", desc: "CBC, urinalysis, blood chemistry, FBS, lipid profile and more.", duration: "15–30 min", price: "From ₱150" },
  { id: "xray", name: "Radiology / X-ray", desc: "Digital chest and extremity X-rays with fast results.", duration: "15 min", price: "From ₱350" },
  { id: "hiv", name: "HIV Counseling & Testing", desc: "Confidential, free counseling and rapid testing by trained staff.", duration: "30–45 min", price: "Free" },
  { id: "checkup", name: "Health Check-up Packages", desc: "Annual physical, pre-employment and executive packages.", duration: "1–2 hrs", price: "From ₱1,200" },
];

export const TIME_SLOTS = ["7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"];

export const CLINIC = {
  name: "AnyoneClinic",
  address: "[Address placeholder], Borongan City, Eastern Samar, Philippines",
  phone: "[Phone placeholder]",
  email: "[Email placeholder]",
  hours: "Mon–Sat, 7:00 AM – 5:00 PM [Hours placeholder]",
};

/** Deterministic mock: some slots are fully booked per date. */
export function isSlotFull(date: string, slot: string) {
  let h = 0;
  for (const c of date + slot) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h % 4 === 0;
}

export type Booking = {
  reference: string;
  serviceId: string;
  date: string;
  time: string;
  name: string;
  age: string;
  sex: string;
  mobile: string;
  email: string;
  notes: string;
  hasRequest: boolean;
  status: "Confirmed" | "Cancelled";
  createdAt: string;
};

const KEY = "anyoneclinic.bookings";

export function getBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
function save(list: Booking[]) { localStorage.setItem(KEY, JSON.stringify(list)); }

export function getBooking(ref: string) {
  return getBookings().find((b) => b.reference.toUpperCase() === ref.toUpperCase());
}
export function addBooking(b: Omit<Booking, "reference" | "status" | "createdAt">): Booking {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  const booking: Booking = { ...b, reference: `AC-${code}`, status: "Confirmed", createdAt: new Date().toISOString() };
  save([...getBookings(), booking]);
  return booking;
}
export function cancelBooking(ref: string) {
  save(getBookings().map((b) => (b.reference === ref ? { ...b, status: "Cancelled" as const } : b)));
}

export const serviceName = (id: string) => SERVICES.find((s) => s.id === id)?.name ?? id;

export function formatDate(d: string) {
  return new Date(d + "T00:00:00").toLocaleDateString("en-PH", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

export function toIcs(b: Booking) {
  const [time, ampm] = b.time.split(" ");
  let [h, m] = time.split(":").map(Number);
  if (ampm === "PM" && h !== 12) h += 12;
  const start = `${b.date.replace(/-/g, "")}T${String(h).padStart(2, "0")}${String(m).padStart(2, "0")}00`;
  const endH = h + (m === 30 ? 1 : 0), endM = m === 30 ? 0 : 30;
  const end = `${b.date.replace(/-/g, "")}T${String(endH).padStart(2, "0")}${String(endM).padStart(2, "0")}00`;
  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//AnyoneClinic//Booking//EN", "BEGIN:VEVENT",
    `UID:${b.reference}@anyoneclinic`, `DTSTART;TZID=Asia/Manila:${start}`, `DTEND;TZID=Asia/Manila:${end}`,
    `SUMMARY:${serviceName(b.serviceId)} – AnyoneClinic`, `LOCATION:${CLINIC.address}`,
    `DESCRIPTION:Booking reference ${b.reference}`, "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
}
