import { celebrate, Joi, Segments } from 'celebrate';

export const validatePhaseCreate = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().trim().max(255).required(),
        image: Joi.string().trim().max(255).required(),
        chapterId: Joi.number().required(),
      },
    },
    { abortEarly: false }
  );
};

export const validatePhaseUpdate = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        id: Joi.number().required(),
        name: Joi.string().trim().max(255).required(),
        image: Joi.string().trim().max(255).required(),
        chapterId: Joi.number().required(),
      },
    },
    { abortEarly: false }
  );
};
