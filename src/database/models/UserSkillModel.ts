import { database } from '../database';
import { DataTypes } from 'sequelize';
import { SkillModel } from './SkillModel';
import { UserCharacterModel } from './UserCharacterModel';

export const UserSkillModel = database.define(
  'tb_user_skill',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userCharacterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: UserCharacterModel,
        key: 'id',
      },
      field: 'user_character_id',
    },
    skillId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: SkillModel,
        key: 'id',
      },
      field: 'skill_id',
    },
  },
  {
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

UserSkillModel.belongsTo(SkillModel, {
  as: 'skill',
  foreignKey: 'skillId',
  targetKey: 'id',
});
