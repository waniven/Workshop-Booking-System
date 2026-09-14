const mongoose = require("mongoose");

const partSchema = new mongoose.Schema(
  {
    partNumber: {
      type: String,
      required: [true, "Part number is required."],
      minlength: 4,
    },
    manufacturer: {
      type: String,
      required: [true, "Part manufacturer is required."],
      trim: true,
      minlength: 2,
    },
    status: {
      type: String,
      required: [true, "Part status is required."],
      trim: true,
      minlength: 2,
    },
  },
  {
    timestamps: true,
  },
);

const Part = mongoose.model("part", partSchema);
module.exports = Part;
