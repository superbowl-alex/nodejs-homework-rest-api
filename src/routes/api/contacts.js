const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

const {
  addContactsValidation,
} = require("../../middleware/validationMiddleware");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", addContactsValidation, ctrl.add);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", addContactsValidation, ctrl.updateById);

module.exports = router;
