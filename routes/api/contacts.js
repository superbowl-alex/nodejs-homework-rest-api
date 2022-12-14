const express = require("express");

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: 200,
      contacts,
    });
  } catch (e) {
    res.json({
      status: 500,
      error: e.message,
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await getContactById(id);
    if (!contact) {
      res.json({
        status: 404,
        message: `Contact with id=${id} not found`,
      });
    }
    res.json({
      status: 200,
      contact,
    });
  } catch (e) {
    res.json({
      status: 500,
      error: e.message,
    });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const newContact = await addContact(body);
    res.json({
      status: 201,
      newContact,
    });
  } catch (e) {
    res.json({
      status: 500,
      error: e.message,
    });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const deletedContact = await removeContact(id);
    if (!deletedContact) {
      res.json({
        status: 404,
        message: `Contact with id=${id} not found`,
      });
    }
    res.json({
      status: 200,
      message: `Contact with id=${id} deleted`,
    });
  } catch (e) {
    res.json({
      status: 500,
      error: e.message,
    });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const body = req.body;
    const updatedContact = await updateContact(id, body);
    if (!updatedContact) {
      res.json({
        status: 404,
        message: `Contact with id=${id} not found`,
      });
    }
    res.json({
      status: 200,
      updatedContact,
    });
  } catch (error) {}
});

module.exports = router;
