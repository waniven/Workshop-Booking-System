const { z } = require("zod");

const phoneRegex = /^(0|\+)\d{1,15}$/;

const contactFields = {
  firstName: z.string().min(2, "First name is required").trim(),
  lastName: z.string().min(2, "Last name is required").trim(),
  phoneNumber: z.string().regex(phoneRegex, "Invalid phone number format"),
  email: z.email("Invalid email format").toLowerCase().trim(),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters long")
    .trim(),
};

const createContactSchema = z.object(contactFields);
const patchContactSchema = z.object(contactFields).partial();

module.exports = { createContactSchema, patchContactSchema, contactFields };
