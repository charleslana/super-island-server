import { celebrate, Joi, Segments } from 'celebrate';

export const validateChapterCreate = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().trim().max(255).required(),
        image: Joi.string().trim().max(255).required(),
        level: Joi.number().integer().min(1).required(),
      },
    },
    { abortEarly: false }
  );
};

export const validateChapterUpdate = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        id: Joi.number().required(),
        name: Joi.string().trim().max(255).required(),
        image: Joi.string().trim().max(255).required(),
        level: Joi.number().integer().min(1).required(),
      },
    },
    { abortEarly: false }
  );
};
