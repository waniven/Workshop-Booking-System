const { z } = require("zod");

const partFields = {
  partName: z.string().min(1, "Part name is required").trim(),
  partNumber: z
    .string()
    .regex(
      /^[a-zA-Z0-9 ]+$/,
      "Part number can only contain letters, numbers, and spaces",
    )
    .trim(),
  manufacturer: z.string().min(2, "Manufacturer is required").trim(),
  stockQuantity: z.number().int().min(0, "Stock quantity cannot be negative"),
};

const createPartSchema = z.object(partFields);
const patchPartSchema = z.object(partFields).partial();

module.exports = { createPartSchema, patchPartSchema, partFields };
