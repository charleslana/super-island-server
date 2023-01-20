import CharacterClassEnum from '../../enum/CharacterClassEnum';
import ItemTypeEnum from '../../enum/ItemTypeEnum';
import RarityEnum from '../../enum/RarityEnum';
import { celebrate, Joi, Segments } from 'celebrate';

export const validateItemCreate = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().trim().max(255).required(),
        image: Joi.string().trim().max(255).required(),
        characterClass: Joi.string().valid(
          ...Object.values(CharacterClassEnum)
        ),
        attack: Joi.number().integer().min(1),
        magicAttack: Joi.number().integer().min(1),
        defense: Joi.number().integer().min(1),
        magicDefense: Joi.number().integer().min(1),
        agility: Joi.number().integer().min(1),
        critical: Joi.number().min(0.1).max(100),
        dodge: Joi.number().min(0.1).max(100),
        rarity: Joi.string()
          .valid(...Object.values(RarityEnum))
          .required(),
        type: Joi.string()
          .valid(...Object.values(ItemTypeEnum))
          .required(),
      },
    },
    { abortEarly: false }
  );
};

export const validateItemUpdate = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        id: Joi.number().required(),
        name: Joi.string().trim().max(255).required(),
        image: Joi.string().trim().max(255).required(),
        attack: Joi.number().integer().min(0),
        magicAttack: Joi.number().integer().min(0),
        defense: Joi.number().integer().min(0),
        magicDefense: Joi.number().integer().min(0),
        agility: Joi.number().integer().min(0),
        critical: Joi.number().min(0.0).max(100),
        dodge: Joi.number().min(0.0).max(100),
        rarity: Joi.string()
          .valid(...Object.values(RarityEnum))
          .required(),
        type: Joi.string()
          .valid(...Object.values(ItemTypeEnum))
          .required(),
      },
    },
    { abortEarly: false }
  );
};
