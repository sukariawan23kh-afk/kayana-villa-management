import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";
import { TestimonialsManager } from "@/components/admin/TestimonialsManager";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  await requireAdmin();
  const testimonials = await db.testimonial.findMany({ orderBy: { order: "asc" } });
  return <TestimonialsManager initialTestimonials={testimonials} />;
}
