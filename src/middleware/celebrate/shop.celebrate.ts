import { celebrate, Joi, Segments } from 'celebrate';

export const validateShopCreate = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        belly: Joi.number().min(0).max(9999999).required(),
        gem: Joi.number().min(0).max(9999999).required(),
        userLevel: Joi.number().min(1).max(9999999).required(),
        itemId: Joi.number().required(),
      },
    },
    { abortEarly: false }
  );
};

export const validateShopUpdate = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        id: Joi.number().required(),
        belly: Joi.number().min(0).max(9999999).required(),
        gem: Joi.number().min(0).max(9999999).required(),
        userLevel: Joi.number().min(1).max(9999999).required(),
        itemId: Joi.number().required(),
      },
    },
    { abortEarly: false }
  );
};
