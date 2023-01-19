import { celebrate, Joi, Segments } from 'celebrate';

export const validateUserCharacterCreate = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        userId: Joi.number().required(),
        characterId: Joi.number().required(),
      },
    },
    { abortEarly: false }
  );
};
