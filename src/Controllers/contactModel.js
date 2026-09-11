const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel');

/**
 * @openapi
 * /contacts:
 *   get:
 *     summary: Retrieve a list of contacts
 *     description: Fetches all contacts from the system.
 *     responses:
 *       200:
 *         description: A successful response with a list of contacts.
 */
router.get("/contacts", async (req, res) => {
  try {
    const contact = await Contact.find();
    res.status(200).json(contact);
  } catch (error) {
    res
      .status(500)
      .json({ error: "failed to fetch all contact, error: " + error.message });
  }
});

/**
 * @openapi
 * /contacts:
 *   post:
 *     summary: Add a new contact
 *     description: Creates a new contact record in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - phoneNumber
 *               - email
 *               - Address
 *             properties:
 *               firstName:
 *                  type: string
 *                  example: "David"
 *               lastName:
 *                  type: string
 *                  example: "Smith"
 *               phoneNumber:
 *                  type: string
 *                  example: "+64 123 456789"
 *               email:
 *                  type: string
 *                  example: "example@domain.com"
 *               Address:
 *                  type: string
 *                  example: "123 street "
 *     responses:
 *       201:
 *         description: contact created successfully.
 *       400:
 *         description: Invalid input data.
 */
router.post("/contacts", async (req, res) => {
  try {
    const newcontact = new Contact(req.body);
    newcontact.save();
    res.status(201).json(newcontact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @openapi
 * /contacts/{id}:
 *   patch:
 *     summary: Update a contact contact
 *     description: Update the details of a specific contact in the system.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique identifier of the contact to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: contact status updated successfully.
 *       400:
 *         description: Invalid input or missing status.
 *       404:
 *         description: contact not found.
 *       500:
 *         description: Internal server error.
 */
router.patch("/contacts/:id", async (req, res) => {
  try{
    const result = await Contact.updateOne(
      { _id: req.params.id }, 
      { $set: req.body }
    );
    res.status(201).json('Sucessfully updated contact status');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @openapi
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     description: Deletes a contact record from the system.
 *     parameters:
 *       - name: contactId
 *         in: path
 *         required: true
 *         description: The unique identifier of the contact to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: contact deleted successfully.
 *       404:
 *         description: contact not found.
 *       400:
 *         description: Invalid contact ID supplied.
 */
router.delete("/contacts/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json('Sucessfully deleted contact');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;