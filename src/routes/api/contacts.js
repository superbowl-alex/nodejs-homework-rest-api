const express = require("express");
const createError = require("http-errors");
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const {
  addContactsValidation,
} = require("../../middleware/validationMiddleware");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({ contacts });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await getContactById(id);
    if (!contact) {
      throw createError(404, `Contact with id=${id} not found`);
    }
    res.status(200).json({ contact });
  } catch (error) {
    next(error);
  }
});

router.post("/", addContactsValidation, async (req, res, next) => {
  try {
    const body = req.body;
    const newContact = await addContact(body);
    res.status(201).json({ newContact });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const deletedContact = await removeContact(id);
    if (!deletedContact) {
      throw createError(404, `Contact with id=${id} not found`);
    }
    res.status(200).json({
      message: `Contact with id=${id} deleted`,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", addContactsValidation, async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const body = req.body;
    const updatedContact = await updateContact(id, body);
    if (!updatedContact) {
      throw createError(404, `Contact with id=${id} not found`);
    }
    res.status(200).json({ updatedContact });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
