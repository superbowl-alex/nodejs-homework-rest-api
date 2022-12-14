const Joi = require("joi");

module.exports = {
  addContactsValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      phone: Joi.string()
        .min(7)
        .max(15)
        .pattern(
          /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
        )
        .required(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res.json({
        status: 400,
        message: validationResult.error.details[0].message,
      });
    }

    next();
  },
};
