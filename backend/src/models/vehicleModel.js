const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
      required: [true, "Vehicle year is required."],
      minlength: 4,
    },
    manufacturer: {
      type: String,
      required: [true, "Vehicle manufacturer is required."],
      trim: true,
      minlength: 2,
    },
    model: {
      type: String,
      required: [true, "Vehicle model is required."],
      trim: true,
      minlength: 2,
    },
  },
  {
    timestamps: true,
  },
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
module.exports = Vehicle;
