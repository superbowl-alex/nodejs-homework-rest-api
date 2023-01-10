const express = require("express");
const router = express.Router();

const { users: ctrl } = require("../../controllers");

const { validation, ctrlWrapper } = require("../../middlewares");
const { schemas } = require("../../models/user");

router.post(
  "/signup",
  validation(schemas.authSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validation(schemas.authSchema), ctrlWrapper(ctrl.login));

module.exports = router;
