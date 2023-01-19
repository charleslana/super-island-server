import CharacterClassEnum from '../../enum/CharacterClassEnum';
import OrganizationEnum from '../../enum/OrganizationEnum';
import RarityEnum from '../../enum/RarityEnum';
import { database } from '../database';
import { DataTypes } from 'sequelize';

export const CharacterModel = database.define(
  'tb_character',
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
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rageHit: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: 'rage_hit',
    },
    rageDefense: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: 'rage_defense',
    },
    attack: {
      type: DataTypes.INTEGER,
    },
    magicAttack: {
      type: DataTypes.INTEGER,
      field: 'magic_attack',
    },
    defense: {
      type: DataTypes.INTEGER,
    },
    magicDefense: {
      type: DataTypes.INTEGER,
      field: 'magic_defense',
    },
    agility: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    critical: {
      type: DataTypes.FLOAT,
    },
    dodge: {
      type: DataTypes.FLOAT,
    },
    rarity: {
      type: DataTypes.ENUM(...Object.values(RarityEnum)),
      allowNull: false,
    },
    organization: {
      type: DataTypes.ENUM(...Object.values(OrganizationEnum)),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
