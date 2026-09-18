const { z } = require("zod");

const vehicleFields = {
  manufacturer: z.string().min(1, "Manufacturer is required").trim(),
  model: z.string().min(1, "Model specification is required").trim(),
  year: z
    .number()
    .int()
    .superRefine((year, ctx) => {
      const currentYear = new Date().getFullYear();
      const maxFutureYear = currentYear + 1;
      const minYear = 1886;

      if (year < minYear || year > maxFutureYear) {
        ctx.addIssue({
          code: z.custom,
          message: `Vehicle year must be between ${minYear} and ${maxFutureYear}`,
        });
      }
    }),
};

const createVehicleSchema = z.object(vehicleFields);
const patchVehicleSchema = z.object(vehicleFields).partial();

module.exports = { createVehicleSchema, patchVehicleSchema, vehicleFields };
