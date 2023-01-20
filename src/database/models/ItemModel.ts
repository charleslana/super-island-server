import CharacterClassEnum from '../../enum/CharacterClassEnum';
import ItemTypeEnum from '../../enum/ItemTypeEnum';
import RarityEnum from '../../enum/RarityEnum';
import { database } from '../database';
import { DataTypes } from 'sequelize';

export const ItemModel = database.define(
  'tb_item',
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
      field: 'character_class',
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
    type: {
      type: DataTypes.ENUM(...Object.values(ItemTypeEnum)),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
