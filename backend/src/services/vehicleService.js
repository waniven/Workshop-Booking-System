const Vehicle = require("../models/vehicleModel");

async function getAllVehicles() {
  return await Vehicle.find();
}

async function addVehicle(newVehicle) {
  const createdVehicle = new Vehicle(newVehicle);
  await createdVehicle.save();
  return createdVehicle;
}

async function updateVehicle(id, data) {
  return await Vehicle.updateOne({ _id: id }, { $set: data });
}

async function deleteVehicle(id) {
  return await Vehicle.findByIdAndDelete(id);
}

module.exports = { getAllVehicles, addVehicle, updateVehicle, deleteVehicle };
