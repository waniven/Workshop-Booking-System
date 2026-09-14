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
      unique: [true, "Phone Number already exists."],
      trim: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: [true, "Email already exists."],
      trim: true,
      minlength: 2,
    },
    address: {
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
