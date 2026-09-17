const Part = require("../models/partModel");

async function findAllParts() {
  return Part.find();
}

async function addPart(newPart) {
  const createdPart = new Part(newPart);
  createdPart.save();
  return createdPart;
}

async function updateStockQuantity(id, stockQuantity) {
  return await Part.updateOne({ _id: id }, { stockQuantity: stockQuantity });
}

async function deletePart(id) {
  return await Part.findByIdAndDelete(id);
}

module.exports = { findAllParts, addPart, updateStockQuantity, deletePart };
