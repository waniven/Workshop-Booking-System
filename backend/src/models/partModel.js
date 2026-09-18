const mongoose = require("mongoose");

const partSchema = new mongoose.Schema(
  {
    partName: {
      type: String,
      required: [true, "Part name is required."],
      trim: true,
    },
    partNumber: {
      type: String,
      unique: [true, "This part already exists."],
      required: [true, "Part number is required."],
      trim: true,
      minlength: 4,
    },
    manufacturer: {
      type: String,
      required: [true, "Part manufacturer is required."],
      trim: true,
      minlength: 2,
    },
    stockQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Part = mongoose.model("part", partSchema);
module.exports = Part;
