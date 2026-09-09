const mongoose = require("mongoose");

const contact = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required."],
      trim: true,
      minlength: 2,
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required."],
      trim: true,
      minlength: 2,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number is required."],
      trim: true,
      minlength: 2,
    },
    eamil: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
      minlength: 2,
    },
    Address: {
      type: String,
      required: [true, "Address is required."],
      trim: true,
      minlength: 2,
    },
  },
  {
    timestamps: true,
  },
);

const Contact = mongoose.model("Contact", contact);
module.exports = Contact;
