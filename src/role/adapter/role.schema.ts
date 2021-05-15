import Joi from 'joi';

export const schemas = {
  LIST_ONE: {
    params: Joi.object({
      id: Joi.number().required(),
    }),
  },
};
