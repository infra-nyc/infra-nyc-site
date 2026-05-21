import { z } from "zod";

export const applySchema = z.object({
  name: z.string().trim().min(2, "Please include your full name."),
  email: z.string().trim().email("Please use a valid email address."),
  company: z.string().trim().min(2, "Please include your company."),
  role: z.string().trim().min(2, "Please include your role."),
  linkedin: z
    .string()
    .trim()
    .url("Please include a full LinkedIn URL.")
    .refine((value) => value.includes("linkedin.com"), "Please use a LinkedIn URL."),
  city: z.string().trim().min(2, "Please include your city."),
  interests: z
    .string()
    .trim()
    .min(24, "Share a little more about the problems you care about."),
});

export type ApplicationPayload = z.infer<typeof applySchema>;
