import { createFileRoute } from "@tanstack/react-router";
import { ServicesGrid } from "@/components/ServicesGrid";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — AnyoneClinic Borongan City" },
      { name: "description", content: "Lab tests, X-ray, confidential HIV testing and health check-up packages at AnyoneClinic." },
      { property: "og:title", content: "Services — AnyoneClinic" },
      { property: "og:description", content: "Lab tests, X-ray, HIV testing and check-up packages in Borongan City." },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl md:text-4xl">Our services</h1>
      <p className="mt-2 text-muted-foreground">Choose a service to book your appointment.</p>
      <div className="mt-8"><ServicesGrid /></div>
    </div>
  ),
});
