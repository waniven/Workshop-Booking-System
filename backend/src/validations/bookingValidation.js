const { z } = require("zod");
const mongoose = require("mongoose");

const objectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid database reference ID",
  });

const bookingFields = {
  bookingDate: z
    .string()
    .datetime({ message: "Invalid ISO 8601 Date string format" }),

  status: z.enum(["Pending", "In-Progress", "Completed", "Cancelled"], {
    errorMap: () => ({
      message: "Status must be Pending, In-Progress, Completed, or Cancelled",
    }),
  }),

  notes: z.string().max(1000, "Notes cannot exceed 1000 characters").trim(),

  contact: objectIdSchema,
  vehicle: objectIdSchema,

  parts: z
    .array(
      z.object({
        partId: objectIdSchema,
        quantityUsed: z
          .number()
          .int()
          .min(1, "Quantity used must be at least 1")
          .default(1),
      }),
    )
    .optional(),
};

const createBookingSchema = z.object(bookingFields);
const patchBookingSchema = z.object(bookingFields).partial();

module.exports = { createBookingSchema, patchBookingSchema };
