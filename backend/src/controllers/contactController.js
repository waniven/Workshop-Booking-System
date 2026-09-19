const express = require("express");
const router = express.Router();
const contactService = require("../services/contactService");
const validate = require("../middleware/validate");
const {
  createContactSchema,
  patchContactSchema,
} = require("../validations/contactValidation");

/**
 * @openapi
 * /contacts:
 *   get:
 *     summary: Retrieve a list of contacts
 *     tags: [Contacts]
 *     description: Fetches all contacts from the system.
 *     responses:
 *       200:
 *         description: A successful response with a list of contacts.
 */
router.get("/contacts", async (req, res) => {
  try {
    const contact = await contactService.getAllContacts();
    res.status(200).json(contact);
  } catch (error) {
    res
      .status(500)
      .json({ error: "failed to fetch all contact, error: " + error.message });
  }
});

/**
 * @openapi
 * /contacts/{id}:
 *   get:
 *     summary: Retrieve a specific contact by ID
 *     tags: [Contacts]
 *     description: A single contacts from the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: A successful response with a list of contacts.
 */
router.get("/contacts/:id", async (req, res) => {
  try {
    const contact = await contactService.getContactById(req.params.id);
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
 *     tags: [Contacts]
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
 *                  example: "+64123456789"
 *               email:
 *                  type: string
 *                  example: "example@domain.com"
 *               address:
 *                  type: string
 *                  example: "123 street "
 *     responses:
 *       201:
 *         description: contact created successfully.
 *       400:
 *         description: Invalid input data.
 */
router.post("/contacts", validate(createContactSchema), async (req, res) => {
  try {
    const newContact = await contactService.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @openapi
 * /contacts/{id}:
 *   patch:
 *     summary: Update a contact contact
 *     tags: [Contacts]
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
router.patch(
  "/contacts/:id",
  validate(patchContactSchema),
  async (req, res) => {
    try {
      await contactService.updateContact(req.params.id, req.body);
      res.status(201).json("Sucessfully updated contact status");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

/**
 * @openapi
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     description: Deletes a contact record from the system.
 *     tags: [Contacts]
 *     parameters:
 *       - name: id
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
    await contactService.deleteContact(req.params.id);
    res.status(200).json("Sucessfully deleted contact");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
