const mongoose = require("mongoose");

const booking = new mongoose.Schema(
  {
    bookingDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In-Progress", "Completed", "Cancelled"],
      default: "Pending",
    },
    contact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    parts: [
      {
        partId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Part",
        },
        quantityUsed: {
          type: Number,
          default: 1,
        },
      },
    ],
    notes: { type: String },
  },
  { timestamps: true },
);

const Booking = mongoose.model("Booking", booking);
module.exports = Booking;
