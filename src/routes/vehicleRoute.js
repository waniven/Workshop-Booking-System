const express = require('express');
const router = express.Router();
const Vehicle = require('../models/vehicleModel');
const req = require('express/lib/request');


/**
 * @openapi
 * /vehicles:
 *   get:
 *     summary: Retrieve a list of vehicles
 *     description: Fetches all vehicles from the system.
 *     responses:
 *       200:
 *         description: A successful response with a list of vehicles.
 */
router.get('/vehicles', async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json(vehicles);
    } catch (error){
        res.status(500).json({ error: 'Failed to fetch all vehicles, error: ' + error.message});
    }
});

/**
 * @openapi
 * /api/vehicles:
 *   post:
 *     summary: Add a new vehicle
 *     description: Creates a new vehicle record in the system.
 *     responses:
 *       201:
 *         description: Vehicle created successfully.
 */
router.post('/vehicles', async (req, res) => {
    try {
        const newVehicle = new Vehicle(req.body);
        await newVehicle.save();
        res.status(201).json(newVehicle);
    } catch (error){
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;