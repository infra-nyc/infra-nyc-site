import { z } from "zod";

const selectedRoleSchema = z.object({
  id: z.string(),
  company: z.string(),
  role: z.string(),
});

export const jobsInterestSchema = z.object({
  linkedin: z
    .string()
    .trim()
    .transform((val) => {
      if (val && !val.startsWith("http")) return `https://${val}`;
      return val;
    })
    .pipe(z.string().url("Please include a full LinkedIn URL."))
    .refine((val) => val.includes("linkedin.com"), "Please use a LinkedIn URL."),
  email: z.string().trim().email("Please use a valid email address."),
  note: z
    .string()
    .trim()
    .min(20, "Please write at least 20 characters."),
  selectedRoles: z
    .array(selectedRoleSchema)
    .min(1, "Please select at least one role."),
});

export type JobsInterestPayload = z.infer<typeof jobsInterestSchema>;
