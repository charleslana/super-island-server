import { CharacterModel } from './CharacterModel';
import { database } from '../database';
import { DataTypes } from 'sequelize';
import { UserModel } from './UserModel';
import { UserSkillModel } from './UserSkillModel';

export const UserCharacterModel = database.define(
  'tb_user_character',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    experience: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    starUpgrade: {
      type: DataTypes.INTEGER,
      field: 'star_upgrade',
    },
    place: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: UserModel,
        key: 'id',
      },
      field: 'user_id',
    },
    characterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: CharacterModel,
        key: 'id',
      },
      field: 'character_id',
    },
  },
  {
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

UserCharacterModel.belongsTo(CharacterModel, {
  as: 'character',
  foreignKey: 'characterId',
  targetKey: 'id',
});

UserCharacterModel.hasMany(UserSkillModel, {
  as: 'skills',
  foreignKey: 'userCharacterId',
});
