const Part = require('../models/partModel');

async function findAllParts() {
    return Part.find();
}

async function addPart(newPart){
    const createdPart = new Part(newPart);
    createdPart.save();
    return createdPart;
}

async function updateStatus(id, status){
    return await Part.updateOne(
        { _id: id },
        { status: status }
    );
}

async function deletePart(id){
    return await Part.findByIdAndDelete(id);
}

module.exports = { findAllParts, addPart, updateStatus, deletePart };