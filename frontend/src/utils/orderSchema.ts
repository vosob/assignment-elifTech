import * as z from "zod";

export const orderSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" }),

  email: z.string().trim().email({ message: "Invalid email address" }),

  phone: z
    .string()
    .trim()
    .regex(/^\+?\d{10,15}$/, {
      message: "Invalid phone number",
    }),

  address: z
    .string()
    .trim()
    .min(5, { message: "Address must be at least 5 characters" }),
});

export type OrderSchema = z.infer<typeof orderSchema>;
