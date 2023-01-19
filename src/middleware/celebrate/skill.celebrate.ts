import CharacterClassEnum from '../../enum/CharacterClassEnum';
import SkillOrderEnum from '../../enum/SkillOrderEnum';
import SkillTypeEnum from '../../enum/SkillTypeEnum';
import { celebrate, Joi, Segments } from 'celebrate';

export const validateSkillCreate = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().trim().max(255).required(),
        image: Joi.string().trim().max(255).required(),
        characterClass: Joi.string()
          .valid(...Object.values(CharacterClassEnum))
          .required(),
        type: Joi.string()
          .valid(...Object.values(SkillTypeEnum))
          .required(),
        order: Joi.string()
          .valid(...Object.values(SkillOrderEnum))
          .required(),
      },
    },
    { abortEarly: false }
  );
};

export const validateSkillUpdate = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        id: Joi.number().required(),
        name: Joi.string().trim().max(255).required(),
        image: Joi.string().trim().max(255).required(),
        type: Joi.string()
          .valid(...Object.values(SkillTypeEnum))
          .required(),
        order: Joi.string()
          .valid(...Object.values(SkillOrderEnum))
          .required(),
      },
    },
    { abortEarly: false }
  );
};
