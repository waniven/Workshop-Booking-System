const express = require('express');
const router = express.Router();
const partService = require('../services/partService');

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
    const parts = await partService.findAllParts();
    res.status(200).json(parts);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    const newPart = await partService.addPart(req.body);
    res.status(201).json(newPart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @openapi
 * /parts/{id}:
 *   patch:
 *     summary: Update a part status
 *     description: Update the status of a specific part in the system.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique identifier of the part to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 description: The new status of the part.
 *     responses:
 *       200:
 *         description: Part status updated successfully.
 *       400:
 *         description: Invalid input or missing status.
 *       404:
 *         description: Part not found.
 *       500:
 *         description: Internal server error.
 */
router.patch("/parts/:id", async (req, res) => {
  try{
    await partService.updateStatus(req.params.id, req.body.status); 
    res.status(201).json('Sucessfully updated part status');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @openapi
 * /parts/{id}:
 *   delete:
 *     summary: Delete a part
 *     description: Deletes a part record from the system.
 *     parameters:
 *       - name: id
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
    await partService.deletePart(req.params.id);
    res.status(200).json('Sucessfully deleted part');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;