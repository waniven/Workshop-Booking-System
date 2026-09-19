const Contact = require("../models/contactModel");

async function getAllContacts() {
  return await Contact.find();
}

async function getContactById(id) {
  return await Contact.findOne({ _id: id });
}

async function addContact(newContact) {
  const contact = new Contact(newContact);
  await contact.save();
  return contact;
}

async function updateContact(id, data) {
  return await Contact.updateOne({ _id: id }, { $set: data });
}

async function deleteContact(id) {
  return await Contact.findByIdAndDelete(id);
}

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
};
