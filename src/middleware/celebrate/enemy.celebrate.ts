import { celebrate, Joi, Segments } from 'celebrate';

export const validateEnemyCreate = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        phaseId: Joi.number().required(),
        characterId: Joi.number().required(),
      },
    },
    { abortEarly: false }
  );
};

export const validateEnemyUpdate = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        id: Joi.number().required(),
        phaseId: Joi.number().required(),
        characterId: Joi.number().required(),
      },
    },
    { abortEarly: false }
  );
};
