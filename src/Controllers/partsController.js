const express = require('express');
const router = express.Router();
const Part = require('../models/partsModel');

/**
 * @openapi
 * /parts:
 *   get:
 *     summary: Retrieve a list of parts
 *     description: Fetches all parts from the system.
 *     responses:
 *       200:
 *         description: A successful response with a list of parts.
 */
router.get("/parts", async (req, res) => {
  try {
    const parts = await Part.find();
    res.status(200).json(parts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "failed to fetch all parts, error: " + error.message });
  }
});

/**
 * @openapi
 * /parts:
 *   post:
 *     summary: Add a new part
 *     description: Creates a new part record in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - partNumber
 *               - manufacturer
 *               - status
 *             properties:
 *               partNumber:
 *                 type: integer
 *                 example: 16165845315
 *               manufacturer:
 *                 type: string
 *                 example: "Bilstein"
 *               status:
 *                 type: string
 *                 example: "Ordered"
 *     responses:
 *       201:
 *         description: Part created successfully.
 *       400:
 *         description: Invalid input data.
 */
router.post("/parts", async (req, res) => {
  try {
    const newPart = new Part(req.body);
    newPart.save();
    res.status(201).json(newPart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @openapi
 * /parts/{partId}:
 *   delete:
 *     summary: Delete a part
 *     description: Deletes a part record from the system.
 *     parameters:
 *       - name: partId
 *         in: path
 *         required: true
 *         description: The unique identifier of the part to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Part deleted successfully.
 *       404:
 *         description: Part not found.
 *       400:
 *         description: Invalid part ID supplied.
 */
router.delete("/parts/:id", async (req, res) => {
  try {
    await Part.findByIdAndDelete(req.params.id);
    res.status(200).json('Sucessfully deleted part');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;