const express = require("express");
const router = express.Router();

const { users: ctrl } = require("../../controllers");

const { validation, ctrlWrapper, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");

router.post(
  "/signup",
  validation(schemas.authSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validation(schemas.authSchema), ctrlWrapper(ctrl.login));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  "/",
  authenticate,
  validation(schemas.updateSubscriptionSchema),
  ctrlWrapper(ctrl.updateUserSubscription)
);

module.exports = router;
