import { celebrate, Joi, Segments } from 'celebrate';

export const validateSetId = () => {
  return celebrate(
    {
      [Segments.PARAMS]: {
        id: Joi.number().required(),
      },
    },
    { abortEarly: false }
  );
};
