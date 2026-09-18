const express = require("express");
const router = express.Router();
const bookingService = require("../services/bookingService");

/**
 * @swagger
 * components:
 *   schemas:
 *     PartItem:
 *       type: object
 *       required:
 *         - partId
 *         - quantityUsed
 *       properties:
 *         partId:
 *           type: string
 *           example: "650af4a123456789012345ef"
 *         quantityUsed:
 *           type: integer
 *           example: 2
 *     Booking:
 *       type: object
 *       required:
 *         - bookingDate
 *         - contact
 *         - vehicle
 *       properties:
 *         bookingDate:
 *           type: string
 *           format: date-time
 *           example: "2026-09-20T09:00:00.000Z"
 *         status:
 *           type: string
 *           example: "Pending"
 *         contact:
 *           type: string
 *           example: "650af3b1122334455667788a"
 *         vehicle:
 *           type: string
 *           example: "650af3e1122334455667788b"
 *         parts:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PartItem'
 *         notes:
 *           type: string
 *           example: "Squeaking noise when braking and routine oil change."
 */

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new workshop booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: Booking created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Missing compulsory fields or bad data.
 */
router.post("/", async (req, res) => {
  try {
    const newBooking = await addBooking(req.body);
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get all workshop bookings
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: List of all bookings with populated references.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 */
router.get("/", async (req, res) => {
  try {
    const bookings = await getAllBookings();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Get a specific booking by ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The booking ID
 *         example: "650af3b987654321098765cd"
 *     responses:
 *       200:
 *         description: Booking found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: Booking not found.
 */
router.get("/:id", async (req, res) => {
  try {
    const booking = await getBookingById(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /bookings/{id}:
 *   put:
 *     summary: Update an existing booking
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "In Progress"
 *               notes:
 *                 type: string
 *                 example: "Front brake pads completely worn down. Replacing now."
 *     responses:
 *       200:
 *         description: Booking updated successfully.
 *       400:
 *         description: Bad request.
 */
router.put("/:id", async (req, res) => {
  try {
    const result = await updateBooking(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Delete a booking
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Booking deleted successfully.
 *       404:
 *         description: Booking not found.
 */
router.delete("/:id", async (req, res) => {
  try {
    const deletedBooking = await deleteBooking(req.params.id);
    if (!deletedBooking)
      return res.status(404).json({ error: "Booking not found" });
    res.status(200).json({ message: "Booking successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
