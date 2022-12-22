const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

const { validation, ctrlWrapper, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", validation(schemas.addSchema), ctrlWrapper(ctrl.add));

router.patch(
  "/:contactId/favorite",
  isValidId,
  validation(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.deleteById));

router.put(
  "/:contactId",
  isValidId,
  validation(schemas.addSchema),
  ctrlWrapper(ctrl.updateById)
);

module.exports = router;
