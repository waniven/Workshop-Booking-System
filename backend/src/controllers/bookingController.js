const express = require("express");
const router = express.Router();
const bookingService = require("../services/bookingService");
const validate = require("../middleware/validate");
const {
  createBookingSchema,
  patchBookingSchema,
} = require("../validations/bookingValidation");

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
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await bookingService.getAllBookings();
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
router.get("/bookings/:id", async (req, res) => {
  try {
    const booking = await bookingService.getBookingById(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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
router.post("/bookings", validate(createBookingSchema), async (req, res) => {
  try {
    const newBooking = await bookingService.addBooking(req.body);
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /bookings/{id}:
 *   patch:
 *     summary: Partially update an existing booking safely
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ["Pending", "In-Progress", "Completed", "Cancelled"]
 *                 example: "In-Progress"
 *               notes:
 *                 type: string
 *                 example: "Front brake pads completely worn down. Replacing now."
 *     responses:
 *       200:
 *         description: Booking updated successfully.
 *       400:
 *         description: Bad request / Validation failed.
 *       404:
 *         description: Booking not found.
 */
router.patch(
  "/bookings/:id",
  validate(patchBookingSchema),
  async (req, res) => {
    try {
      const result = await bookingService.updateBooking(
        req.params.id,
        req.body,
      );

      if (!result) {
        return res.status(404).json({ error: "Booking not found" });
      }

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
);

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
router.delete("/bookings/:id", async (req, res) => {
  try {
    const deletedBooking = await bookingService.deleteBooking(req.params.id);
    if (!deletedBooking)
      return res.status(404).json({ error: "Booking not found" });
    res.status(200).json({ message: "Booking successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
