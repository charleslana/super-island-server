import CharacterClassEnum from '../../enum/CharacterClassEnum';
import OrganizationEnum from '../../enum/OrganizationEnum';
import RarityEnum from '../../enum/RarityEnum';
import { celebrate, Joi, Segments } from 'celebrate';

export const validateCharacterCreate = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().trim().max(255).required(),
        image: Joi.string().trim().max(255).required(),
        characterClass: Joi.string()
          .valid(...Object.values(CharacterClassEnum))
          .required(),
        hp: Joi.number().integer().min(1).required(),
        rageHit: Joi.number().min(0.1).required(),
        rageDefense: Joi.number().min(0.1).required(),
        attack: Joi.number().integer().min(1),
        magicAttack: Joi.number().integer().min(1),
        defense: Joi.number().integer().min(1),
        magicDefense: Joi.number().integer().min(1),
        agility: Joi.number().integer().min(1).required(),
        critical: Joi.number().min(0.1).max(100),
        dodge: Joi.number().min(0.1).max(100),
        rarity: Joi.string()
          .valid(...Object.values(RarityEnum))
          .required(),
        organization: Joi.string()
          .valid(...Object.values(OrganizationEnum))
          .required(),
      },
    },
    { abortEarly: false }
  );
};

export const validateCharacterUpdate = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        id: Joi.number().required(),
        name: Joi.string().trim().max(255).required(),
        image: Joi.string().trim().max(255).required(),
        hp: Joi.number().integer().min(1).required(),
        rageHit: Joi.number().min(0.1).required(),
        rageDefense: Joi.number().min(0.1).required(),
        attack: Joi.number().integer().min(0),
        magicAttack: Joi.number().integer().min(0),
        defense: Joi.number().integer().min(0),
        magicDefense: Joi.number().integer().min(0),
        agility: Joi.number().integer().min(1).required(),
        critical: Joi.number().min(0.0).max(100),
        dodge: Joi.number().min(0.0).max(100),
        rarity: Joi.string()
          .valid(...Object.values(RarityEnum))
          .required(),
        organization: Joi.string()
          .valid(...Object.values(OrganizationEnum))
          .required(),
      },
    },
    { abortEarly: false }
  );
};
