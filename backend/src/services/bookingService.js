const Booking = require("../models/bookingModel");

async function getAllBookings() {
  return await Booking.find()
    .populate("contact")
    .populate("vehicle")
    .populate("parts.partId");
}

async function getBookingById(id) {
  return await Booking.findById(id)
    .populate("contact")
    .populate("vehicle")
    .populate("parts.partId");
}

async function addBooking(newBooking) {
  const booking = new Booking(newBooking);
  await booking.save();
  return booking;
}

async function updateBooking(id, data) {
  return await Booking.updateOne({ _id: id }, { $set: data });
}

async function deleteBooking(id) {
  return await Booking.findByIdAndDelete(id);
}

module.exports = {
  getAllBookings,
  getBookingById,
  addBooking,
  updateBooking,
  deleteBooking,
};
