const { celebrate, Joi } = require('celebrate');

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/https?:\/\/(www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)/),
  }),
});

module.exports = validateCard;
