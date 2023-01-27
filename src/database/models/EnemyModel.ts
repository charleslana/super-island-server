import { CharacterModel } from './CharacterModel';
import { database } from '../database';
import { DataTypes } from 'sequelize';
import { PhaseModel } from './PhaseModel';

export const EnemyModel = database.define(
  'tb_enemy',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    phaseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: PhaseModel,
        key: 'id',
      },
      field: 'phase_id',
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
    timestamps: false,
  }
);

EnemyModel.belongsTo(CharacterModel, {
  as: 'character',
  foreignKey: 'characterId',
  targetKey: 'id',
});

EnemyModel.belongsTo(PhaseModel, {
  as: 'phase',
  foreignKey: 'phaseId',
  targetKey: 'id',
});
