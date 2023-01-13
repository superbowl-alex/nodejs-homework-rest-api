const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

const {
  validation,
  ctrlWrapper,
  isValidId,
  authenticate,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", authenticate, isValidId, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  validation(schemas.addSchema),
  ctrlWrapper(ctrl.add)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validation(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.deleteById)
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validation(schemas.addSchema),
  ctrlWrapper(ctrl.updateById)
);

module.exports = router;
