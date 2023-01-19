import { celebrate, Joi, Segments } from 'celebrate';

export const validateUserSkillCreate = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        userCharacterId: Joi.number().required(),
        skillId: Joi.number().required(),
      },
    },
    { abortEarly: false }
  );
};

export const validateSetUserCharacterIdAndSkillId = () => {
  return celebrate(
    {
      [Segments.PARAMS]: {
        id: Joi.number().required(),
        userCharacterId: Joi.number().required(),
      },
    },
    { abortEarly: false }
  );
};
