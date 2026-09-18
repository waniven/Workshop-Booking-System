const express = require("express");
const router = express.Router();
const vehicleService = require("../services/vehicleService");

/**
 * @openapi
 * components:
 *   schemas:
 *     Vehicle:
 *       type: object
 *       required:
 *         - year
 *         - manufacturer
 *         - model
 *       properties:
 *         year:
 *           type: integer
 *           example: 2022
 *         manufacturer:
 *           type: string
 *           example: "Toyota"
 *         model:
 *           type: string
 *           example: "Hilux"
 */

/**
 * @openapi
 * /vehicles:
 *   get:
 *     summary: Retrieve a list of vehicles
 *     tags: [Vehicles]
 *     description: Fetches all vehicles from the system.
 *     responses:
 *       200:
 *         description: A successful response with a list of vehicles.
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch all vehicles, error: Database disconnected"
 */
router.get("/vehicles", async (req, res) => {
  try {
    const vehicles = await vehicleService.getAllVehicles();
    res.status(200).json(vehicles);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch all vehicles, error: " + error.message });
  }
});

/**
 * @openapi
 * /vehicles:
 *   post:
 *     summary: Add a new vehicle
 *     tags: [Vehicles]
 *     description: Creates a new vehicle record in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       201:
 *         description: Vehicle created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "650af3e1122334455667788b"
 *                 year:
 *                   type: integer
 *                   example: 2022
 *                 manufacturer:
 *                   type: string
 *                   example: "Toyota"
 *                 model:
 *                   type: string
 *                   example: "Hilux"
 *       400:
 *         description: Invalid input data.
 *       500:
 *         description: Internal server error.
 */
router.post("/vehicles", async (req, res) => {
  try {
    const newVehicle = await vehicleService.addVehicle(req.body);
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @openapi
 * /vehicles/{id}:
 *   patch:
 *     summary: Update a vehicle
 *     tags: [Vehicles]
 *     description: Update specific fields or details of a vehicle in the system.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique identifier of the vehicle to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Vehicle updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Sucessfully updated vehicle status"
 *       400:
 *         description: Invalid input details.
 *       404:
 *         description: Vehicle not found.
 *       500:
 *         description: Internal server error.
 */
router.patch("/vehicles/:id", async (req, res) => {
  try {
    const updatestatus = await vehicleService.updateVehicle(
      req.params.id,
      req.body,
    );
    res.status(201).json("Sucessfully updated vehicle status");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @openapi
 * /vehicles/{id}:
 *   delete:
 *     summary: Delete a vehicle
 *     tags: [Vehicles]
 *     description: Deletes a vehicle record from the system.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique identifier of the vehicle to delete.
 *     responses:
 *       200:
 *         description: Vehicle deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Sucessfully deleted vehicle"
 *       404:
 *         description: Vehicle not found.
 *       400:
 *         description: Invalid vehicle ID supplied.
 */
router.delete("/vehicles/:id", async (req, res) => {
  try {
    await vehicleService.deleteVehicle(req.params.id);
    res.status(200).json("Sucessfully deleted vehicle");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
