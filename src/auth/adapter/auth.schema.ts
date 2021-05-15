import Joi from 'joi';

const paramId = Joi.object({
  id: Joi.number().required(),
});

export const schemas = {
  LOGIN: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    }),
  },
  REFRESH_TOKEN: {
    params: Joi.object({
      refreshToken: Joi.string().required(),
    }),
  },
};
