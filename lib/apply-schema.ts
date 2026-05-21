import { z } from "zod";

export const applySchema = z.object({
  name: z.string().trim().min(2, "Please include your full name."),
  email: z.string().trim().email("Please use a valid email address."),
  company: z.string().trim().min(2, "Please include your company."),
  role: z.string().trim().min(2, "Please include your role."),
  linkedin: z
    .string()
    .trim()
    .transform((val) => {
      if (val && !val.startsWith("http")) return `https://${val}`;
      return val;
    })
    .pipe(z.string().url("Please include a full LinkedIn URL."))
    .refine((value) => value.includes("linkedin.com"), "Please use a LinkedIn URL."),
  event_cities: z.union([z.string(), z.array(z.string())]).optional().transform((val) => {
    if (!val) return "";
    return Array.isArray(val) ? val.join(", ") : val;
  }),
});

export type ApplicationPayload = z.infer<typeof applySchema>;
