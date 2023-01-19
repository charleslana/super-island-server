import CharacterClassEnum from '../../enum/CharacterClassEnum';
import SkillOrderEnum from '../../enum/SkillOrderEnum';
import SkillTypeEnum from '../../enum/SkillTypeEnum';
import { database } from '../database';
import { DataTypes } from 'sequelize';

export const SkillModel = database.define(
  'tb_skill',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    characterClass: {
      type: DataTypes.ENUM(...Object.values(CharacterClassEnum)),
      allowNull: false,
      field: 'character_class',
    },
    type: {
      type: DataTypes.ENUM(...Object.values(SkillTypeEnum)),
      allowNull: false,
    },
    order: {
      type: DataTypes.ENUM(...Object.values(SkillOrderEnum)),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
