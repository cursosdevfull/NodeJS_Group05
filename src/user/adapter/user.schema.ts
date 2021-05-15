import Joi from 'joi';

const paramId = Joi.object({
  id: Joi.number().required(),
});

export const schemas = {
  LIST_ONE: {
    params: paramId,
  },
  LIST_BY_PAGE: {
    params: Joi.object({
      page: Joi.number().min(0).required(),
    }),
  },
  INSERT: {
    body: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
      photo: Joi.string(),
      roles: Joi.array().required(),
    }),
  },
  UPDATE: {
    params: paramId,
    body: Joi.object({
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      photo: Joi.string(),
    }),
  },
  REMOVE: {
    params: paramId,
  },
};
